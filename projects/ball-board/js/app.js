'use strict'

const WALL = 'WALL'
const FLOOR = 'FLOOR'

const BALL = 'BALL'
const GAMER = 'GAMER'

const GAMER_IMG = '\n\t\t<img src="img/gamer.png">\n'
const BALL_IMG = '\n\t\t<img src="img/ball.png">\n'

// Model:
var gBoard
var gGamerPos
var gBallCollected
var gCreateBall

// sound
const BALL_SOUND = new Audio('sound/ball-sound.wav')

function initGame() {
    gGamerPos = { i: 2, j: 9 }
    gBoard = buildBoard()

    renderBoard(gBoard)
    gBallCollected = 0
    renderPasseges(gBoard)
    var elCollected = document.querySelector('.collected-num')
    elCollected.innerText = gBallCollected
    var elRestartBtn = document.querySelector('.restart')
    elRestartBtn.classList.add('hide')
    gCreateBall = setInterval(addBall, 4000)
}

function buildBoard() {
    var board = []

    // TODO: Create the Matrix 10 * 12 
    board = createMat(10, 12)

    // TODO: Put FLOOR everywhere and WALL at edges
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            board[i][j] = { type: FLOOR, gameElement: null }
            if (i === 0 || i === board.length - 1) board[i][j].type = WALL
            else if (j === 0 || j === board[i].length - 1) board[i][j].type = WALL
        }
    }

    // TODO: Place the gamer and two balls
    board[gGamerPos.i][gGamerPos.j].gameElement = GAMER
    board[4][7].gameElement = BALL
    board[3][3].gameElement = BALL

    console.log(board);
    return board;
}


// Render the board to an HTML table
function renderBoard(board) {

    var elBoard = document.querySelector('.board')
    var strHTML = ''

    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>\n'

        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j]

            var cellClass = getClassName({ i, j })

            if (currCell.type === FLOOR) cellClass += ' floor'
            else if (currCell.type === WALL) cellClass += ' wall'

            strHTML += `\t<td class="cell ${cellClass}" onclick="moveTo(${i}, ${j})">`

            if (currCell.gameElement === GAMER) {
                strHTML += GAMER_IMG;
            } else if (currCell.gameElement === BALL) {
                strHTML += BALL_IMG;
            }

            strHTML += '\t</td>\n'
        }
        strHTML += '</tr>\n'
    }
    // console.log('strHTML is:')
    // console.log(strHTML)
    elBoard.innerHTML = strHTML
}

function renderPasseges(gBoard) {
    // edit the model first
    var i = getRandomInteger(1, 8)
    gBoard[i][0].type = "FLOOR"
    gBoard[i][gBoard[i].length - 1].type = "FLOOR"
    var j = getRandomInteger(1, 10)
    gBoard[0][j].type = "FLOOR"
    gBoard[gBoard.length - 1][j].type = "FLOOR"
    // edit the dom 
    var elCellPassegeTop = document.querySelector(`.cell-0-${j}`)
    var elCellPassegeBottom = document.querySelector(`.cell-${gBoard.length - 1}-${j}`)
    var elCellPassegeLeft = document.querySelector(`.cell-${i}-0`)
    var elCellPassegeRight = document.querySelector(`.cell-${i}-${gBoard[i].length - 1}`)
    var elCells = [elCellPassegeTop, elCellPassegeBottom, elCellPassegeLeft, elCellPassegeRight]
    for (var cell of elCells) {
        cell.classList.remove('wall')
        cell.classList.add('floor')
    }

}

// Move the player to a specific location
function moveTo(i, j) {
    var isCollect
    var targetCell = gBoard[i][j]
    if (targetCell.type === WALL) return

    // Calculate distance to make sure we are moving to a neighbor cell
    var iAbsDiff = Math.abs(i - gGamerPos.i)
    var jAbsDiff = Math.abs(j - gGamerPos.j)
    console.log('targetCell', i, j);

    // If the clicked Cell is one of the four allowed
    if (iAbsDiff + jAbsDiff === 1 || i === 0 || j === 0 || j === 11
        || i === 9) {
        // || gGamerPos.i + i === gBoard[i].length 
        if (targetCell.gameElement === BALL) {
            // update the Model
            gBallCollected++
            // update the dom
            var elCollected = document.querySelector('.collected-num')
            elCollected.innerText = gBallCollected
            isCollect = true
            BALL_SOUND.play()
            console.log('Collecting!')
        } else isCollect = false

        // TODO: Move the gamer
        // Update the Model:
        gBoard[gGamerPos.i][gGamerPos.j].gameElement = null

        // DOM:
        renderCell(gGamerPos, '')

        // Update the Model:
        targetCell.gameElement = GAMER
        gGamerPos = { i, j }

        // DOM:
        renderCell(gGamerPos, GAMER_IMG)

    } else console.log('TOO FAR', iAbsDiff, jAbsDiff)

    if (isCollect && isEmpty()) {
        console.log('empty')
        clearInterval(gCreateBall)
        var elRestartBtn = document.querySelector('.restart')
        elRestartBtn.classList.remove('hide')
    }
}

// Convert a location object {i, j} to a selector and render a value in that element
function renderCell(location, value) {
    var cellSelector = '.' + getClassName(location)
    var elCell = document.querySelector(cellSelector)
    elCell.innerHTML = value
}

// Move the player by keyboard arrows
function handleKey(event) {
    var width = 12
    var height = 10
    var i = gGamerPos.i
    var j = gGamerPos.j


    switch (event.key) {
        case 'ArrowLeft':
            if (j === 0) j = width
            moveTo(i, j - 1)
            break;
        case 'ArrowRight':
            moveTo(i, (j + 1) % width)
            break;
        case 'ArrowUp':
            moveTo((i ? i - 1: height - 1) , j)
            break;
        case 'ArrowDown':
            moveTo((i + 1) % height, j)
            break;

    }

}

function isEmpty() {
    // run on all the matrix and check if we have 
    // ball in the matrix and return it

    for (var i = 1; i <= gBoard.length - 2; i++) {
        var row = gBoard[i]
        for (var j = 1; j < row.length - 1; j++) {
            var cell = row[j]
            if (cell.gameElement === BALL) return false
        }
    }
    return true
}



function addBall() {
    // set interval for 3 seconds and after that use random
    // take random position using getRandom
    console.log('add ball');
    var i = getRandomInteger(1, 8)
    var j = getRandomInteger(1, 10)
    // catch the object in this position to update the Model
    var currCell = gBoard[i][j]
    if (!currCell.gameElement) {
        currCell.gameElement = BALL
        //  catch the element in this position and update the Dom
        renderCell({ i, j }, BALL_IMG)
    }
    if (isEmpty()) clearInterval(gCreateBall)
    // console.log('currCell', currCell, i, j);

}
// Returns the class name for a specific cell
function getClassName(location) {
    var cellClass = 'cell-' + location.i + '-' + location.j
    return cellClass
}


