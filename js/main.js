'use strict'

// Step1 – the seed app: To do --> 
// DONE --> 1. Create a 4x4 gBoard Matrix containing Objects. Place 2 mines manually when each cell’s isShown set to true.
// DONE --> 2. Present the mines using renderBoard() function.

// Step2 – counting neighbors:
// DONE --> 1. Create setMinesNegsCount() and store the numbers (isShown is still true)
// DONE --> 2. Present the board with the neighbor count and the mines using renderBoard() function.
// DONE --> 3. Have a console.log presenting the board content – to help you with debugging

// Step3 – click to reveal:
// DONE --> 1. Make sure your renderBoard() function adds the cell ID to each cell 
// and onclick on each cell calls cellClicked() function.
// DONE --> 2. Make the default “isShown” to be “false”
// DONE --> 3. Implement that clicking a cell with “number” reveals the number of this cell

// Step4 – randomize mines' location:
// DONE --> 1. Randomly locate the 2 mines on the board
// DONE --> 2. Present the mines using renderBoard() function.


// Next Steps: Head back to Functionality and Features and then on to Further Tasks, 
// and if time permits check out the Bonus Tasks section.


// Functionality and Features
// To Do -- > ● Show a timer that starts on first click (right / left) and stops when game is over.
// DONE -- > ● Left click reveals the cell’s content
// To Do -- > ● Right click flags/unflags a suspected cell (you cannot reveal a flagged cell)
// To Do -- > ● Game ends when:
//                 o LOSE: when clicking a mine, all mines should be revealed
//                 o WIN: all the mines are flagged, and all the other cells are shown
// To Do -- > ● Support 3 levels of the game
//                 o Beginner (4*4 with 2 MINES)
//                 o Medium (8 * 8 with 12 MINES)
//                 o Expert (12 * 12 with 30 MINES)
// To Do -- > ● If you have the time, make your Minesweeper look great.





const MINE = '💣';
const EMPTY = '';

const noContext = document.getElementById('noContextMenu');


var gSeconds = 0
var gIntreval = -1
var gCellClickCount = 0;

//The model
var gBoard;


//This is an object by which the board size is set (in this case: 4x4 board and how many mines to put)
var gLevel = {
    SIZE: 4,
    MINES: 2
}

// This is an object in which you can keep and update the current game state:
var gGame = {
    // isOn: Boolean, when true we let the user play
    isOn: false,

    // shownCount: How many cells are shown
    shownCount: 0,

    // markedCount: How many cells are marked (with a flag)
    markedCount: 0,

    //secsPassed: How many seconds passed
    secsPassed: 0
}



// This is called when page loads
function initGame() {
    gBoard = buildBoard();
    setMines();
    setMinesNegsCount(gBoard);
    renderBoard(gBoard);

}


// Builds the board Set mines at random locations Call setMinesNegsCount() Return the created board
function buildBoard() {
    var board = createMat(4, 4);
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var cell = {
                minesAroundCount: EMPTY,
                isShown: false,
                isMine: false,
                isMarked: false
            }
            board[i][j] = cell;
        }
    }
    return board;
}


// Count mines around each cell and set the cell's minesAroundCount.
function setMinesNegsCount(board) {
    var cellMineNeighborsNum;
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            cellMineNeighborsNum = countMineNeighbors(i, j, board);
            if (cellMineNeighborsNum > 0) board[i][j].minesAroundCount = cellMineNeighborsNum;
        }
    }
    console.log(board);
}

// Render the board as a <table> to the page
function renderBoard(board) {
    var strHTML = ''
    var elTable = document.querySelector('.table')

    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            var tdId = `cell-${i}-${j}`; // cell-0-0
            strHTML += `<td id="${tdId}" onclick="cellClicked(this,${i}, ${j})" class="${'td'}"> </td>`
        }
        strHTML += '</tr>'
    }
    elTable.innerHTML = strHTML;
}



// Called when a cell (td) is clicked
function cellClicked(elCell, i, j) {
    gCellClickCount++
    if (gCellClickCount === 1) {
        gIntreval = setInterval(incrementSeconds, 1000);
    }

    //The model
    gBoard[i][j].isShown = true;

    console.log(gBoard);
    if (!gBoard[i][j].isMine && gBoard[i][j].minesAroundCount !== NaN) {
        // //DOM
        elCell.innerText = gBoard[i][j].minesAroundCount;
    } else if (gBoard[i][j].isMine) {
        // //DOM
        elCell.innerText = MINE;
        gameOver();
    }
}



// function cellRightClicked(ev) {
//     console.log('here');
//     console.log(ev);
// noContext.addEventListener('contextmenu', e => {
//     e.preventDefault();
// });
// // }

var button = document.querySelector('#button');
var log = document.querySelector('#log');
button.addEventListener('mouseup', logMouseButton);


function logMouseButton(e) {
    if (typeof e === 'object') {
        switch (e.button) {
            case 0:
                log.textContent = 'Left button clicked.';
                break;
            case 1:
                log.textContent = 'Middle button clicked.';
                break;
            case 2:
                log.textContent = 'Right button clicked.';
                break;
            default:
                log.textContent = `Unknown button code: ${e.button}`;
        }
    }
}


function setMine() {
    var emptyCells = getEmptyCells(gBoard);
    // console.log(emptyCells);
    if (!emptyCells.length) return
    var randIdx = getRandomInt(0, emptyCells.length)
    var randCell = emptyCells[randIdx]
    gBoard[randCell.i][randCell.j].isMine = true;
}


// ------ need to fix with bigger numbers --------
function setMines() {
    for (var i = 0; i < gLevel.MINES; i++) {
        setMine()
    }
}





// Called on right click to mark a cell (suspected to be a mine) 
// Search the web (and implement) how to hide the context menu on right click
function cellMarked(elCell) {

}


// Game ends when all mines are marked, and all the other cells are shown
function checkGameOver() {

}


// When user clicks a cell with no mines around, we need to open not only that cell, but also its neighbors.
// NOTE: start with a basic implementation that only opens the non-mine 1st degree neighbors
// BONUS: if you have the time later, try to work more like the real algorithm (see description at the Bonuses section below)
function expandShown(board, elCell, i, j) {

}


// function setLevel(level) {
//     gCellCount = level
//     resetTimer()
//     var nums = resetNums(level)
//     renderBoard(nums);
// }

function incrementSeconds() {
    var elTime = document.querySelector('.time');
    gSeconds++;
    elTime.innerText = gSeconds;
}


function resetTimer() {
    var elTime = document.querySelector('.time');
    gSeconds = 0
    elTime.innerText = gSeconds;
}

function gameOver() {
    clearInterval(gIntreval);
}