import { COLUMNS, ROWS, normal_position_to_index } from './position.mjs';
import { Piece, PieceColor, PieceType } from './piece.mjs';

function generate_starting_pieces() {
    return PieceColor.values.flatMap(color => {
        /**
         * @type {Piece[]}
         */
        const pieces = [];
        const piece_data = {
            row: color.starting_row,
            color: color,
            type: PieceType.Rook
        };

        /* === First Row === */

        pieces.push(
            new Piece({
                ...piece_data,
                column: 'a'
            }),
            new Piece({
                ...piece_data,
                column: 'h'
            })
        );

        piece_data.type = PieceType.Knight;

        pieces.push(
            new Piece({
                ...piece_data,
                column: 'b'
            }),
            new Piece({
                ...piece_data,
                column: 'g'
            })
        );

        piece_data.type = PieceType.Bishop;

        pieces.push(
            new Piece({
                ...piece_data,
                column: 'c'
            }),
            new Piece({
                ...piece_data,
                column: 'f'
            })
        );

        piece_data.type = PieceType.Queen;

        pieces.push(
            new Piece({
                ...piece_data,
                column: 'd'
            })
        );

        piece_data.type = PieceType.King;

        pieces.push(
            new Piece({
                ...piece_data,
                column: 'e'
            })
        );

        /* === Second Row === */

        piece_data.row += color.direction;
        piece_data.type = PieceType.Pawn;

        return pieces.concat(
            COLUMNS.map(column => new Piece({
                ...piece_data,
                column
            }))
        );
    });
}

class GameState {
    /**
     * @type {Piece[]}
     */
    #pieces;

    get pieces() {
        return this.#pieces;
    }

    /**
     * @type {Move[]}
     */
    #moves;

    /**
     * Generates a 2D array with the pieces on their positions
     * 
     * @param {any} [fill = null] fill for empty squares
     * 
     * @returns {(Piece|any)[][]} 2D array with pieces and fill
     */
    generate_board(fill = null) {
        const board = [];

        // fill the board ...
        COLUMNS.forEach(_ => {
            board.push([]);

            ROWS.forEach(_ =>
                board[board.length - 1].push(fill)
            );
        });

        // ... then place the pieces
        this.#pieces.forEach(piece => {
            let { i, j } = normal_position_to_index(piece);

            board[i][j] = piece;
        });

        return board;
    }

    /**
     * 
     * @param {object} [param = {}]
     * @param {Piece[]} [param.pieces]
     */
    constructor({ pieces = generate_starting_pieces() } = {}) {
        this.#pieces = pieces;
    }

    deep_copy() {
        return new GameState({
            pieces: this.#pieces.map(piece => piece.deep_copy())
        });
    }
}

export {
    GameState
};