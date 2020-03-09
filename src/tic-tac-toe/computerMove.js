import { Subject, timer } from 'rxjs';

export const computerMove$ = new Subject();

export const simulatedComputerTurn = (validCells) => {
    const randomCell = Math.floor( Math.random() * validCells.lenth );
    timer(500).subscribe( ()=> computerMove$.next( validCells[randomCell] ));
}
