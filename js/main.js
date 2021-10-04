'use strict'

// Step1 – the seed app: To do --> 
// DONE --> 1. Create a 4x4 gBoard Matrix containing Objects. Place 2 mines manually when each cell’s isShown set to true.
// DONE --> 2. Present the mines using renderBoard() function.

// Step2 – counting neighbors:
// DONE --> 1. Create setMinesNegsCount() and store the numbers (isShown is still true)
// DONE --> 2. Present the board with the neighbor count and the mines using renderBoard() function.
// DONE --> 3. Have a console.log presenting the board content – to help you with debugging

// Step3 – click to reveal:
// To do --> 1. Make sure your renderBoard() function adds the cell ID to each cell 
// and onclick on each cell calls cellClicked() function.
// To do --> 2. Make the default “isShown” to be “false”
// To do --> 3. Implement that clicking a cell with “number” reveals the number of this cell

// Step4 – randomize mines' location:
// To do --> 1. Randomly locate the 2 mines on the board
// To do --> 2. Present the mines using renderBoard() function.

// Next Steps: Head back to Functionality and Features and then on to Further Tasks, 
// and if time permits check out the Bonus Tasks section.


const MINE = '💣';


//The model
var gBoard = {
    minesAroundCount: '',
    isShown: false,
    isMine: false,
    isMarked: false
}

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
    setMinesNegsCount(gBoard);
    renderBoard(gBoard);
}


// Builds the board Set mines at random locations Call setMinesNegsCount() Return the created board
function buildBoard() {
    var board = createMat(4, 4);
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var cell = {
                minesAroundCount: '',
                isShown: false,
                isMine: false,
                isMarked: false
            }
            board[i][j] = cell;
        }
    }
    board[1][1].isMine = true;
    board[1][1].isShown = true;
    board[2][2].isMine = true;
    board[2][2].isShown = true;

    return board;
}


// Count mines around each cell and set the cell's minesAroundCount.
function setMinesNegsCount(board) {
    var cellMineNeighborsNum;
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            cellMineNeighborsNum = countMineNeighbors(i, j, board);
            // console.log('cellMineNeighborsNum for: ', i, j, ' is: ', cellMineNeighborsNum);
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
            if (board[i][j].isMine && board[i][j].isShown) {
                strHTML += '<td class="td" onclick="cellClicked(elCell, i, j)">' + MINE + '</td>'
            } else {
                var minesAroundCount = board[i][j].minesAroundCount;
                strHTML += '<td class="td" onclick="cellClicked(elCell, i, j)">' + minesAroundCount + '</td>'
            }
        }
        strHTML += '</tr>'
    }
    elTable.innerHTML = strHTML;
}



// Called when a cell (td) is clicked
function cellClicked(elCell, i, j) {

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
