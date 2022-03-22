import { relative_position } from './position.mjs';

/**
 * Enum for piece types (king, queen, rook, etc.)
 */
class PieceType {
    static King = new PieceType('king');
    static Queen = new PieceType('queen');
    static Rook = new PieceType('rook');
    static Bishop = new PieceType('bishop');
    static Knight = new PieceType('knight');
    static Pawn = new PieceType('pawn');

    /**
     * @type {string}
     */
    #id;

    /**
     * 
     * @param {string} id 
     */
    constructor(id) {
        this.#id = id;
    }

    get name() {
        return this.#id;
    }

    /**
     * @returns {PieceType[]}
     */
    static get values() {
        return Object.keys(PieceType).map(key => PieceType[key]);
    }
}

/**
 * Enum for piece colors (white and black)
 */
class PieceColor {
    static White = new PieceColor('white');
    static Black = new PieceColor('black');

    /**
     * @type {string}
     */
    #id;

    /**
     * 
     * @param {string} id 
     */
    constructor(id) {
        this.#id = id;
    }

    get name() {
        return this.#id;
    }

    get is_white() {
        return this.#id === PieceColor.White.#id;
    }

    get is_black() {
        return this.#id === PieceColor.Black.#id;
    }

    get starting_row() {
        return this.is_white ? 1 : 8;
    }

    get direction() {
        return this.is_white ? 1 : -1;
    }

    /**
     * @returns {PieceColor[]}
     */
    static get values() {
        return Object.keys(PieceColor).map(key => PieceColor[key]);
    }
}

/**
 * Piece with color, type and position
 */
class Piece {
    /**
     * @type {string}
     */
    #column;

    get column() {
        return this.#column;
    }

    /**
     * @type {number}
     */
    #row;

    get row() {
        return this.#row;
    }

    /**
     * @type {PieceColor}
     */
    #color;

    get color() {
        return this.#color;
    }

    get is_white() {
        return this.#color.is_white;
    }

    get is_black() {
        return this.#color.is_black;
    }

    /**
     * @type {PieceType}
     */
    #type;

    get type() {
        return this.#type;
    }

    /**
     * 
     * @param {object} param
     * @param {string} param.column
     * @param {number} param.row
     * @param {PieceColor} param.color
     * @param {PieceType} param.type
     */
    constructor({ column, row, color, type }) {
        this.#column = column.toLowerCase();
        this.#row = row;
        this.#color = color;
        this.#type = type;
    }

    /**
     * Makes a safe deep copy of this Piece
     * 
     * @returns the copy
     */
    deep_copy() {
        return new Piece({
            column: this.#column,
            row: this.#row,
            color: this.#color,
            type: this.#type
        });
    }

    /**
     * Checks if both pieces have the same attributes
     * 
     * @param {Piece} another_piece 
     * 
     * @returns {boolean} true if and only if they are equal
     */
    equals(another_piece) {
        if (!another_piece) {
            return false;
        } else if (this === another_piece) {
            return true;
        }

        return this.#column === another_piece.#column &&
            this.#row === another_piece.#row &&
            this.#color === another_piece.#color &&
            this.#type === another_piece.#type;
    }

    /**
     * Moves this Piece, by a given column/row increment
     * 
     * @param {object} [param = {}]
     * @param {number} [param.column = 0]
     * @param {number} [param.row = 0]
     */
    move_self_relative({ column = 0, row = 0 } = {}) {
        this.move_self_absolute(relative_position({
            column: this.#column,
            row: this.#row,
            column_incr: column,
            row_incr: row
        }));
    }

    /**
     * Moves this Piece, at a given position
     * 
     * @param {object} param
     * @param {string} param.column
     * @param {number} param.row
     */
    move_self_absolute({ column, row }) {
        this.#column = column.toLowerCase();
        this.#row = row;
    }

    /**
     * Moves a copy of this Piece, by a given column/row increment
     * 
     * @param {object} [param = {}]
     * @param {number} [param.column = 0]
     * @param {number} [param.row = 0]
     * 
     * @returns {Piece} a copy of this Piece, moved
     */
    move_relative({ column = 0, row = 0 } = {}) {
        return this.move_absolute(relative_position({
            column: this.#column,
            row: this.#row,
            column_incr: column,
            row_incr: row
        }));
    }

    /**
     * Moves a copy of this Piece, at a given position
     * 
     * @param {object} param
     * @param {string} param.column
     * @param {number} param.row
     * 
     * @returns {Piece} a copy of this Piece, moved
     */
    move_absolute({ column, row }) {
        let new_piece = this.deep_copy();

        new_piece.move_self_absolute({ column, row });

        return new_piece;
    }

    /**
     * @returns {string}
     */
    to_unicode() {
        let code_point = '♔'.codePointAt(0);
        code_point += this.is_black ? 6 : 0;

        switch (this.#type) {
            case PieceType.King:
                code_point += 0;
                break;
            case PieceType.Queen:
                code_point += 1;
                break;
            case PieceType.Rook:
                code_point += 2;
                break;
            case PieceType.Bishop:
                code_point += 3;
                break;
            case PieceType.Knight:
                code_point += 4;
                break;
            case PieceType.Pawn:
                code_point += 5;
                break;
        }

        return String.fromCodePoint(code_point);
    }
}

export {
    PieceColor,
    PieceType,
    Piece
};