import { game$ } from './tic-tac-toe/game';
import { drawGame, writeMessage } from './tic-tac-toe/draw'; 
import { timer } from 'rxjs';


export default () => {
    /** start coding */
    
    game$.subscribe(gameState => {
        drawGame(gameState);
        if( gameState.winner ){
            timer(500).subscribe( () => writeMessage( gameState.winner == 1 ? 'You win' : 'You lose' ) );
        } else if (  gameState.finised ) {
            timer(500).subscribe( () => writeMessage( 'Draws' ) );
        }
    }, 
    err => console.log("error: ", err), 
    data => console.log("COMPLETE"));
    /** end coding */
}