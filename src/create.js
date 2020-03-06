import { displayLog } from './utils';
import { Observable, of, range, interval, from, timer, fromEvent } from 'rxjs';

const ExerciseOne = () => {
    const helloObs = new Observable( ( observer ) =>{
        observer.next('Hello');
        setTimeout( ()=>{
            observer.next('Word');
        }, 500 );
        setTimeout( ()=>{
            observer.next('AM');
        }, 1000 );
        setTimeout( ()=>{
            observer.complete();
        }, 1500 );
    });
    helloObs.subscribe( evt => displayLog(evt) );
    const subscribe = helloObs.subscribe( evt => displayLog(evt) );
    setTimeout( ()=> {
        subscribe.unsubscribe();        
    }, 750 );
};

const ExerciseTwo = () => {

    let number = 0;
    const myArray = new Array(8);
    const src = 'Example Two';
    const arrSrc = '12345678';
    const myPromise = new Promise( (resolve, reject) => {
        setTimeout( ()=>resolve('?And ready app'),1500);
    });

    const observable = from(myPromise);

    observable.subscribe( (val) => displayLog(val) );

};

const ExerciseTree = () => {
    const source = of(1,2,3,4,5,6,7);
    const sourceMix = of(
        [1,2,3],
        'Hello Word',
        { foo: "bar" },
        function sayHello(){ 
            return 'Hi!';
        },
        4,5,6,7);
    const sourceRange = range(7,14);
    sourceRange.subscribe( data => displayLog(data) );
};

const ExerciseFour = () => {
    const source = interval(500);
    const subscrition = source.subscribe( data => displayLog(data) );
    const sourceTwo = timer( 4000, 100 );
    const subscritionTwo = sourceTwo.subscribe( data => displayLog('===> '+data) );
    // setTimeout( ()=>{
    //     subscrition.unsubscribe();
    // }, 3500 );
    timer(3500).subscribe( ()=> subscrition.unsubscribe() );
    timer(6000).subscribe( ()=> subscritionTwo.unsubscribe() );
};

const ExerciseFive = () => {

    const actionBtn = document.getElementById('action-btn');

    actionBtn.addEventListener( 'click', function(){
        console.log('Tradicional cliked !!!');
    });

    const source = fromEvent( actionBtn, 'click' );

    source.subscribe( evt => {
        console.log('?Using libarary RxJs', evt );
        displayLog(` click evet at pos: X -> ${ evt.x }, Y -> ${ evt.y }`);
    });
    fromEvent( actionBtn, 'mousemove' ).subscribe( console.log );
}

export default ExerciseFive;

