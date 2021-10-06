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
// DONE -- > ● Show a timer that starts on first click (right / left) and stops when game is over.
// DONE -- > ● Left click reveals the cell’s content
// DONE -- > ● Right click flags/unflags a suspected cell (you cannot reveal a flagged cell)
// DONE -- > ● Game ends when:
//                 o LOSE: when clicking a mine, all mines should be revealed
//                 o WIN: all the mines are flagged, and all the other cells are shown
// DONE -- > ● Support 3 levels of the game
//                 o Beginner (4*4 with 2 MINES)
//                 o Medium (8 * 8 with 12 MINES)
//                 o Expert (12 * 12 with 30 MINES)
// To Do --------------------------------- > ● If you have the time, make your Minesweeper look great.


// Further Tasks
// DONE --> First click is never a Mine
//               Make sure the first clicked cell is never a mine (like in the real game)
//               HINT: place the mines and count the neighbors only on first click.
// DONE --> Lives
//             Add support for “LIVES” -
//             The user has 3 LIVES:
//             When a MINE is clicked, there is an indication to the user that he clicked a mine.
//             The LIVES counter decrease. The user can continue playing.
// DONE --> The Smiley
//              Add smiley (feel free to switch icons \ images):
//                 ● Normal 😃
//                 ● Sad & Dead – LOSE 🤯 (stepped on a mine)
//                 ● Sunglasses – WIN 😎
//                 ● Clicking the smiley should reset the game




const MINE = '💣';
const MARKED_MINE = '💥';
const FLAG = '🚩';
const EMPTY = '';


var gSeconds = 0
var gFlags = 0
var gSecIntreval = -1
var gCellClickCount = 0;
var gMines_Count = 0;
var gNeighborsArr = [];
var gCountLives = 3;

var button = document.querySelector('#button');
var log = document.querySelector('#log');

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


function setLevel(size, mines) {
    gLevel = {
        SIZE: size,
        MINES: mines
    }
    console.log(gLevel);
    newGame();
}


// This is called when page loads
function initGame() {
    gBoard = buildBoard();
    renderBoard(gBoard);
    button.addEventListener('mouseup', logMouseButton);
}


// Builds the board Set mines at random locations Call setMinesNegsCount() Return the created board
function buildBoard() {
    gMines_Count = 0
    var board = createMat(gLevel.SIZE, gLevel.SIZE);
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
    console.log(board);
    return board;
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


function cellClicked(elCell, i, j) {
    startGame();
    // console.log(elCell);
    //The model
    if (gBoard[i][j].isShown) return;

    gBoard[i][j].isShown = true;

    console.log(gBoard);

    //  -------------------- expandShown development----------------------------
    // if (!gBoard[i][j].isMine && gBoard[i][j].minesAroundCount === '') {
    //     expandShown(gBoard, elCell, i, j);
    // }

    if (!gBoard[i][j].isMine && gBoard[i][j].minesAroundCount !== NaN) {
        //DOM
        elCell.innerText = gBoard[i][j].minesAroundCount;
        elCell.style.backgroundColor = 'gray';
        elCell.style.fontsize = '22px';

        numColorSeclection(elCell);
        gGame.shownCount++;
        console.log(gGame.shownCount);
    } else if (gBoard[i][j].isMine) {
        //DOM
        gCountLives--;
        if (gCountLives === 2) {
            var elHearts = document.querySelector('.hearts');
            elHearts.innerText = '💛💛';
            gBoard[i][j].isShown = false;

        }
        if (gCountLives === 1) {
            var elHearts = document.querySelector('.hearts');
            elHearts.innerText = '💛';
            gBoard[i][j].isShown = false;

        }
        if (gCountLives === 0) {
            var elHearts = document.querySelector('.hearts');
            elHearts.innerText = 'No lives'
            elCell.innerText = MARKED_MINE;
            gameLoss(elCell, i, j);
        }
    }
    if (gCellClickCount === 1) {
        console.log('here once')
        setMines();
        setMinesNegsCount(gBoard);
    }
    checkGameOver();
}


// Called when a cell (td) is clicked
// Called on right click to mark a cell (suspected to be a mine) 
// Search the web (and implement) how to hide the context menu on right click
function cellMarked(elCell) {
    console.log(elCell);
    var cellId = elCell.id;
    var myArr = cellId.split('-');
    var i = +myArr[1]
    var j = +myArr[2];

    if (gBoard[i][j].isMarked) {
        gGame.markedCount--;
        //Enter gGame.markedCount to Flags view
        var elFlagCount = document.querySelector('.flag-count');
        elFlagCount.innerText = gGame.markedCount;

        //The model
        gBoard[i][j].isMarked = false;
        console.log(gBoard);

        //DOM
        elCell.innerText = EMPTY;
    } else {
        gGame.markedCount++;
        //Enter gGame.markedCount to Flags view
        var elFlagCount = document.querySelector('.flag-count');
        elFlagCount.innerText = gGame.markedCount;

        //The model
        gBoard[i][j].isMarked = true;
        console.log(gBoard);

        //DOM
        elCell.innerText = FLAG;
    }
    console.log(gGame.markedCount);
    checkGameOver();

}


function logMouseButton(e) {
    if (typeof e === 'object') {
        if (e.button === 2) {
            cellRightClicked(e)
        } else return;
    }
}


function cellRightClicked(e) {
    startGame();
    var elCell = e.target;
    cellMarked(elCell);
}



function startGame() {
    gGame.isOn = true;
    startTime();
}


function startTime() {
    gCellClickCount++
    if (gCellClickCount === 1) {
        gSecIntreval = setInterval(incrementSeconds, 1000);
    }
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
    // console.log(board);
}


//------------------------------------- לצערי לא הצלחתי לממש, אנסה ביום שלישי -----------------------------------
// When user clicks a cell with no mines around, we need to open not only that cell, but also its neighbors.
// NOTE: start with a basic implementation that only opens the non-mine 1st degree neighbors
// BONUS: if you have the time later, try to work more like the real algorithm (see description at the Bonuses section below)
function expandShown(board, elCell, i, j) {
    console.log('here');
    countMineNeighbors(i, j, board);
    for (var z = 0; z < gNeighborsArr.length; z++) {
        var negsCell = gNeighborsArr[z];
        console.log(negsCell);
        j = negsCell.splice(1);
        i = negsCell[0];
        j = j[0];
        console.log(i, j)
        gBoard[i][j].isShown = true;
        //DOM
        var elCell = document.querySelector('.td');
        console.log(elCell.id);

        elCell.innerText = gBoard[i][j].minesAroundCount;
        elCell.style.backgroundColor = 'gray';
        elCell.style.fontsize = '22px';

        numColorSeclection(elCell);
        gGame.shownCount++;
        console.log(gGame.shownCount);
    }
}


function numColorSeclection(elCell) {
    switch (elCell.innerText) {
        case '1':
            elCell.style.color = 'blue'
            break;
        case '2':
            elCell.style.color = 'yellow'
            break;
        case '3':
            elCell.style.color = 'red'
            break;
        case '4':
            elCell.style.color = 'purple'
            break;
        case '5':
            elCell.style.color = 'pink'
            break;
        default:
            elCell.style.color = 'white'
    }
}




function setMine() {
    var emptyCells = getEmptyCells(gBoard);
    // console.log(emptyCells);
    if (!emptyCells.length) return
    var randIdx = getRandomInt(0, emptyCells.length)
    var randCell = emptyCells[randIdx]
    while (gBoard[randCell.i][randCell.j].isMine || gBoard[randCell.i][randCell.j].isShown) {
        var randIdx = getRandomInt(0, emptyCells.length)
        var randCell = emptyCells[randIdx]
    }
    gBoard[randCell.i][randCell.j].isMine = true;
    gMines_Count++;
    console.log(gMines_Count);
}


function setMines() {
    for (var i = 0; i < gLevel.MINES; i++) {
        setMine()
    }
}


// Game ends when all mines are marked, and all the other cells are shown
function checkGameOver() {
    if (gGame.shownCount + gGame.markedCount === gLevel.SIZE * gLevel.SIZE) {
        clearInterval(gSecIntreval);
        var elWinnerMsg = document.querySelector('.winner')
        elWinnerMsg.style.display = 'block';
        console.log('winner');
        var elSmiley = document.querySelector('.smiley')
        elSmiley.innerText = '😎';
    }
}


function gameLoss(elCell, a, b) {
    clearInterval(gSecIntreval);
    console.log(elCell, a, b);

    var elLoserMsg = document.querySelector('.loser')
    elLoserMsg.style.display = 'block';

    var elSmiley = document.querySelector('.smiley')
    elSmiley.innerText = '🤯';

    //------------------------------------- לצערי לא הצלחתי לממש, אנסה ביום שלישי -----------------------------------


    // var location = {
    //     i: a,
    //     j: b
    // }
    // var a = location.i
    // var b = location.j
    // console.log(a);
    // console.log(b);

    // for (var i = 0; i < gBoard.length; i++) {
    //     for (var j = 0; j < gBoard[0].length; j++) {
    //         if (gBoard[i][j].isMine) {
    //             if (i !== a && j !== b) {
    //                 location = {
    //                     i: i,
    //                     j: j
    //                 }
    //                 renderCell(location, MINE);
    //             }
    //         }
    //     }
    // }
    // console.log('here');
}


function newGame() {
    var elLoserMsg = document.querySelector('.loser')
    elLoserMsg.style.display = 'none';

    var elWinnerMsg = document.querySelector('.winner')
    elWinnerMsg.style.display = 'none';

    var elZeroTime = document.querySelector('.sec-count')
    elZeroTime.innerText = '0'

    var elZeroFlag = document.querySelector('.flag-count')
    elZeroFlag.innerText = '0'

    var elSmiley = document.querySelector('.smiley')
    elSmiley.innerText = '😃';

    var elHeart = document.querySelector('.hearts')
    elHeart.innerText = '💛💛💛';

    clearInterval(gSecIntreval);

    gGame = {
        isOn: false,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0
    }

    gSeconds = 0
    gSecIntreval = -1
    gCellClickCount = 0;
    gMines_Count = 0;
    gCountLives = 3;

    initGame()
}