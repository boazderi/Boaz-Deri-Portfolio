'use strict'

const WALL = '#'
const FOOD = '.'
const EMPTY = ' '
const SUPER_FOOD = '🍪'
const CHERRY = '🍒'

var gGame
var gBoard
var gMaxFood
var gFood
var gIntervalCherry

function init() {
    gFood = 0
    gGame = {
        score: 0,
        isOn: false
    }
    document.querySelector('h2 span').innerText = gGame.score
    console.log('hello')
    // create a board model
    gBoard = buildBoard()
    createPacman(gBoard)
    createGhosts(gBoard)
    document.querySelector('.modal').classList.add('hide')
    document.querySelector('.game-over').classList.add('hide')
    document.querySelector('.victory').classList.add('hide')
    renderBoard(gBoard, '.board-container')
    gGame.isOn = true

    gIntervalCherry = setInterval(spawnCherry, 15000)
}

function buildBoard() {
    const SIZE = 10
    gMaxFood = (SIZE - 2) ** 2 - 4 - 4
    const board = []

    for (var i = 0; i < SIZE; i++) {
        board.push([])

        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD

            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL
            }
            if (i === 1 && j === 1 ||
                i === 1 && j === SIZE - 2 ||
                i === SIZE - 2 && j === 1 ||
                i === SIZE - 2 && j === SIZE - 2) {
                board[i][j] = SUPER_FOOD
            }
        }
    }
    return board
}

function updateScore(diff) {
    gGame.score += diff
    document.querySelector('h2 span').innerText = gGame.score
}
function gameOver(status = 'lose') {
    gGame.isOn = false
    clearInterval(gIntervalGhosts)
    clearInterval(gIntervalCherry)
    var elModal = document.querySelector('.modal')
    elModal.classList.remove('hide')

    if (status === 'lose') {
        console.log('Game Over')
        var elGameOver = document.querySelector('.game-over')
        elGameOver.classList.remove('hide')
    } else {
        console.log('Winning!')
        var elVictory = document.querySelector('.victory')
        elVictory.classList.remove('hide')

    }
}

function getEmptyCells() {
    var emptyCells = []
    for (var i = 0; i < gBoard.length; i++) {
        var row = gBoard[i]
        for (var j = 0; j < row.length; j++) {
            if (row[j] === EMPTY) emptyCells.push({ i, j })
        }
    }
    return emptyCells
}

function spawnCherry() {
    var emptyCells = getEmptyCells()
    if (emptyCells.length > 0) {
        var cherryPosition = emptyCells[getRandomIntInclusive(0, emptyCells.length - 1)]
        // update the model
        gBoard[cherryPosition.i][cherryPosition.j] = CHERRY
        // update the dom
        renderCell(cherryPosition, CHERRY)
    }
}