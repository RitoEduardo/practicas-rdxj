import { displayLog } from './utils';
import { fromEvent } from 'rxjs';
import { mapTo, map, filter, tap, first, take, takeWhile, last, takeLast, skip, reduce, scan } from 'rxjs/operators';
export default () => {
    fromEvent( document.getElementById('grid') ,'click').pipe( 
        tap( console.log ),
        map( e => [ 
            Math.floor( e.offsetX / 50 ),
            Math.floor( e.offsetY /50 ) 
        ]),
        takeWhile( ( [col,row] ) => col != 0 ),
        tap( console.log ),
        // reduce( ( accumulator, currentValue ) => {
        scan( ( accumulator, currentValue ) => {
            // const [col,row] = currentValue;
            return { 
                clicks: accumulator.clicks + 1,
                cells: [ ...accumulator.cells, currentValue ]
            }
            // semilla para inicializar el filter
        }, { clicks: 0 , cells: [] })
    ).subscribe( d => {
        console.log( d );
        displayLog( ` Numero de clicks => ${d.clicks} , Acumudados => ${ d.cells }  `);
    });
    return;
    /** start coding */
    const grid = document.getElementById('grid');
    const click$ = fromEvent(grid,'click').pipe( 
        // tap( console.log ),
        map( e => [ 
            Math.floor( e.offsetX / 50 ) + 1,
            Math.floor( e.offsetY /50 ) + 1] 
        ),
        // filter( val => ( val[0] + val[1] ) % 2 != 0 ),
        /*** Unicamente toma el primer resultado y hace un unsubsribe ***/
        // first( val => val[0] > 5 ) // Cunple la condición y muere
        // take(5),
        /*** Se ejecuta solo mientras se siga cumpla la condicion, 
         * si al principio no se cumple, nunca se ejecutara ***/
        // takeWhile( ([col,row]) => ( col + row ) %2 != 0),
        takeWhile( ( [col,row] ) => col > 5 ),
        tap( console.log ),
        /* Se ejecuta despues de que se cierra el hilo de comunicación,
             es decir el último valido */
        // last()
        // takeLast(3)
        /* Skip a partir de **/
        skip(5)
        // tap( console.log )
    );
    // let count = 0;
    click$.subscribe( e => {
        displayLog( e );
        // count++;
        // click$.subscribe( result => {
        //     displayLog(`Subscribe ${ count } --> ${ result }`);
        // });
    });

    /** end coding */
}