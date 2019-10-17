// @ts-check
module.exports = function solveSudoku(matrix) {

    const emptyPositions = storeEmptyPositions(matrix);

    let currentPosition = 0;
    let initialValue = 1;
    while (currentPosition < emptyPositions.length) {
        const x = emptyPositions[currentPosition][0];
        const y = emptyPositions[currentPosition][1];

        let noMatches = false;
        let currentValue = initialValue;
        while (currentValue <= 9 && !noMatches) {

            noMatches = checkValue(matrix, x, y, currentValue);

            if (noMatches) {
                matrix[x][y] = currentValue;
                currentPosition++;
                initialValue = 1;
            }

            currentValue++;
        }

        if (!noMatches && currentValue > 9) {
            matrix[x][y] = 0;
            currentPosition--;
            initialValue = matrix[emptyPositions[currentPosition][0]][emptyPositions[currentPosition][1]];
            initialValue++;
            matrix[emptyPositions[currentPosition][0]][emptyPositions[currentPosition][1]] = 0;
        }
    }

    // console.log('matrix', matrix);
    return matrix;

}

function storeEmptyPositions(matrix) {
    const emptyPositions = [];

    for (let x = 0; x < matrix.length; x++) {
        for (let y = 0; y < matrix[x].length; y++) {
            if (matrix[x][y] === 0) {
                emptyPositions.push([x, y]);
            }
        }
    }

    return emptyPositions;
}

function checkRow(matrix, rowToCheck, numberToCheck) {
    return matrix[rowToCheck].filter(number => {
        return number === numberToCheck;
    }).length === 0;
}

function checkColumn(matrix, columnToCheck, numberToCheck) {
    for (let i = 0; i < matrix.length; i++) {
        if (matrix[i][columnToCheck] === numberToCheck) {
            return false;
        }
    }

    return true;
}

function check3x3Square(matrix, row, column, numberToCheck) {
    const squareSize = 3;
    const startRow = Math.floor(row / squareSize) * squareSize;
    const startColumn = Math.floor(column / squareSize) * squareSize;
    let result = 0;

    for (let x = startRow; x < startRow + squareSize; x++) {
        for (let y = startColumn; y < startColumn + squareSize; y++) {
            if (matrix[x][y] === numberToCheck) {
                result++;
            }
        }
    }

    return result === 0;
}

function checkValue(matrix, row, column, numberToCheck) {
    return checkRow(matrix, row, numberToCheck)
        && checkColumn(matrix, column, numberToCheck)
        && check3x3Square(matrix, row, column, numberToCheck);
}