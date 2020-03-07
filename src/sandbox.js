import { updateDisplay, updateDisplayTwo } from './utils';
import { displayLog } from './utils';
import { fromEvent, Subject, BehaviorSubject } from 'rxjs';
import { map, tap, takeWhile, startWith, 
    endWith, distinct, distinctUntilChanged,
    pairwise, share, delay, bufferTime,
    sampleTime, auditTime, throttleTime,
    debounceTime
} from 'rxjs/operators';

const partOne = function(){
    fromEvent( document.getElementById('grid') ,'click').pipe( 
        // tap( console.log ),
        // startWith( { offsetX: 500, offsetY: 500 }),
        map( e => [ 
            Math.floor( e.offsetX / 50 ),
            Math.floor( e.offsetY /50 ) 
        ]),
        takeWhile( ( [col,row] ) => col != 0 ),
        tap( console.log ),
        /*** distinct no mata el hilo de la función */
        // map( ([col,row]) => col+row ),
        // distinct()

        // distinct( ([col,row]) => `${col},${row}` )
        /*** Bloquear click consecutivos ***/
        distinctUntilChanged( (cell1, cell2) =>
            (cell1[0] == cell2[0]) &&
            (cell1[1] == cell2[1])
        )
        // startWith( 'veamos', 'otro'),
        // endWith("Game finish", "bye")
    ).subscribe( d => {
        // console.log( d );
        displayLog( d );
    });
}

const partTwo = function(){

    const progressBar = document.getElementById('progress-bar');
    const docElement = document.documentElement;
    const updateProgressBar = (percentage) => {
        progressBar.style.width = `${percentage}%`;
    }

    //observable that returns scroll (from top) on scroll events
    const scroll$ = fromEvent(document, 'scroll').pipe(
        // tap( e => console.log("[scroll evt]")),
        // throttleTime(100),
        // sampleTime(100),
        map( () => docElement.scrollTop ),
        tap(evt => console.log("[scroll]: ", evt))
        /** Cambia de un call de observable a un hot observable, lo 
         * caul quiere decir que no generara multiples instancias
         */
        // share()
        // pairwise(),
        // tap( ([previos,current])=>{
        //     updateDisplay( current>previos ? 'DESC' : 'ASC');
        // })
    );

    //observable that returns the amount of page scroll progress
    const scrollProgress$ = scroll$.pipe(
        map(evt => {
            const docHeight = docElement.scrollHeight - docElement.clientHeight;
            return (evt / docHeight) * 100;
        }),
        /*** Buffer time, siempre se esta ejecutando */
        // bufferTime(50,100),
        tap( evt => console.log("[Buffer]:", evt ))
    );

    // const scrollProgressHot$ = new Subject();
    const scrollProgressHot$ = new BehaviorSubject(0);
    scrollProgress$.subscribe( scrollProgressHot$ );

    //subscribe to scroll progress to paint a progress bar
    scrollProgressHot$.subscribe(updateProgressBar);

    scrollProgressHot$.subscribe( (val) => {
        updateDisplay(`${ Math.floor(val)}%`);
    });

    scrollProgressHot$.subscribe( (val) => {
        updateDisplayTwo(` Por esparta ->${ Math.floor(val)}%`);
    });

    // Para inicializar
    // scrollProgressHot$.next(0);
    console.log('Scroll initial ---->', scrollProgressHot$.value );
}

const example = async function(){
    const isFnDelay = (miliseconst, fail = false ) => {
        return new Promise( (resolve, reject) => {
            if( fail ){ reject('?Se forzo a fallar') }
            setTimeout( function(){
                resolve();
            }, miliseconst );
        });
    }
        
    await isFnDelay(2500);
    console.clear();
    console.log('Experimental');
    isFnDelay(1500, false ).then( () =>{  console.log('Peligrosos son algunos atagos'); } ).catch( console.log );
    console.log('Claro que funciona');
}

const partTree = function(){
    const inputBox = document.getElementById('inputBox');
    const inputSrc$ = fromEvent(inputBox,"input").pipe(
        debounceTime(500),
        map( event => event.target.value )
    );
    inputSrc$.subscribe(displayLog);
}

export default partTree;