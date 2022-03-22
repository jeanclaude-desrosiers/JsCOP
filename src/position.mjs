/*

Chess board representations

    Normal {column, row} :

      a b c d e f g h ˃ column
    8 □ ■ □ ■ □ ■ □ ■
    7 ■ □ ■ □ ■ □ ■ □
    6 □ ■ □ ■ □ ■ □ ■
    5 ■ □ ■ □ ■ □ ■ □
    4 □ ■ □ ■ □ ■ □ ■
    3 ■ □ ■ □ ■ □ ■ □
    2 □ ■ □ ■ □ ■ □ ■
    1 ■ □ ■ □ ■ □ ■ □
    ⌄
    row

    Index {i, j} :

      0 1 2 3 4 5 6 7 ˃ j
    7 □ ■ □ ■ □ ■ □ ■
    6 ■ □ ■ □ ■ □ ■ □
    5 □ ■ □ ■ □ ■ □ ■
    4 ■ □ ■ □ ■ □ ■ □
    3 □ ■ □ ■ □ ■ □ ■
    2 ■ □ ■ □ ■ □ ■ □
    1 □ ■ □ ■ □ ■ □ ■
    0 ■ □ ■ □ ■ □ ■ □
    ⌄
    i

*/

const COLUMNS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const FIRST_COLUMN_CHAR_CODE = COLUMNS[0].charCodeAt(0);

const ROWS = [1, 2, 3, 4, 5, 6, 7, 8];

/**
 * Moves a given position by a given column/row increment
 * 
 * @param {object} param
 * @param {string} param.column
 * @param {number} param.row
 * @param {number} [param.column_incr = 0] 
 * @param {number} [param.row_incr = 0]
 * 
 * @returns {{column : string, row : number}} the new position
 */
function relative_position({ column, row, column_incr = 0, row_incr = 0 }) {
    let column_char_code = column.toLowerCase().charCodeAt(0) - FIRST_COLUMN_CHAR_CODE;

    column_char_code += column_incr;

    return {
        column: String.fromCharCode(column_char_code),
        row: row + row_incr
    };
}

/**
 * 
 * @param {object} param
 * @param {string} param.column
 * @param {number} param.row
 */
function normal_position_to_index({ column, row }) {
    return {
        j: COLUMNS.indexOf(column),
        i: ROWS.indexOf(row)
    };
}

/**
 * 
 * @param {object} param
 * @param {number} param.i
 * @param {number} param.j
 */
function index_position_to_normal({ i, j }) {
    return {
        column: COLUMNS[j],
        row: ROWS[i]
    };
}

export {
    COLUMNS,
    ROWS,
    relative_position,
    normal_position_to_index,
    index_position_to_normal
};