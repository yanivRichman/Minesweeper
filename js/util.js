'use strict'

function createMat(ROWS, COLS) {
    var mat = []
    for (var i = 0; i < ROWS; i++) {
        var row = []
        for (var j = 0; j < COLS; j++) {
            row.push('')
        }
        mat.push(row)
    }
    return mat
}


function countMineNeighbors(cellI, cellJ, mat) {
    var neighborsCount = 0;
    gNeighborsArr = [];
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue;
            if (j < 0 || j >= mat[i].length) continue;
            gNeighborsArr.push([i, j]);
            if (mat[i][j].isMine) neighborsCount++;
        }
    }
    // console.log(gNeighborsArr);
    return neighborsCount;
}


function getEmptyCells(board) {
    var emptyCells = []
    for (var i = 0; i < board.length; i++)
        for (var j = 0; j < board[0].length; j++) {
            emptyCells.push({ i: i, j: j })
        }
    return emptyCells
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}


function incrementSeconds() {
    var elTime = document.querySelector('.sec-count');
    gSeconds++;
    elTime.innerText = gSeconds;
}


function resetTimer() {
    var elTime = document.querySelector('.sec-count');
    gSeconds = 0
    elTime.innerText = gSeconds;
}

function resetFlags() {
    var elFlag = document.querySelector('.flag-count');
    gFlags = 0
    elFlag.innerText = gFlags;
}


// location such as: {i: 2, j: 7}
function renderCell(location, value) {
    // Select the elCell and set the value
    var elCell = document.querySelector('.td');
    console.log(elCell);
    console.log(location);
    console.log(value);
    // elCell.innerHTML = value;
}