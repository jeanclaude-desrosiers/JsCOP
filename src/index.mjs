import { Piece } from './piece.mjs';
import { GameState } from './game_state.mjs';

/**
 * 
 * @param {(Piece|any)[][]} board 
 * 
 * @returns {string}
 */
function debug_board(board) {
    let board_str = '';

    board.forEach(column => {
        let row = '';
        column.forEach(square => {
            if (square && square instanceof Piece) {
                row += `${square.to_unicode()} `;
            } else {
                row += '# ';
            }
        });

        board_str = row + '\n' + board_str;
    });

    return board_str;
}

let game_state = new GameState();

console.log(debug_board(game_state.generate_board()));