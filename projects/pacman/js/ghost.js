'use strict'

const GHOST = '&#9781;'

var gGhosts = []
var gKilledGhosts = []
var gIntervalGhosts

function createGhost(board) {
    const ghost = {
        location: {
            i: 3,
            j: 3
        },
        currCellContent: FOOD,
        color: getRandomColor()
    }
    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = GHOST
}

function createGhosts(board) {
    gGhosts = []
    for (var i = 0; i < 3; i++) {
        createGhost(board)
    }
    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function ghostKilled(idx) {
    // find the ghost index 
    // var currentGhostIdx = idx

    // console.log('gGhosts', gGhosts)
    // splice it and push to another array
    var killedGhost = gGhosts.splice(idx, 1)[0]
    gKilledGhosts.push(killedGhost)
    renderCell(killedGhost.location, killedGhost.currCellContent)
    // return it after a few seconds
    // console.log('currentGhostidx', currentGhostIdx);
    // console.log('killedGhost', killedGhost)
    // console.log('gKilledGhosts', gKilledGhosts);
}

// create a function reviveGhosts
function reviveGhosts() {
    console.log('gKilledGhosts', gKilledGhosts);
    var killedLength = gKilledGhosts.length
    for (var i = 0; i < killedLength; i++) {
        // var killedGhost = gKilledGhosts.pop()
        var killedGhost = gKilledGhosts[i]
        gGhosts.push(killedGhost)
    }
    gKilledGhosts = []
    console.log('gGhosts', gGhosts);
}

function moveGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        const ghost = gGhosts[i]
        moveGhost(ghost)
    }
}

function moveGhost(ghost) {
    const moveDiff = getMoveDiff();
    const nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    if (nextCell === WALL) return
    if (nextCell === GHOST) return
    if (nextCell === PACMAN && gPacman.isSuper) return
    if (nextCell === PACMAN) {
        gameOver()
        return
    }
    // update the place that the ghost move from
    // model
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent

    // DOM
    renderCell(ghost.location, ghost.currCellContent)

    // update the place that the ghost move to
    // model
    ghost.location = nextLocation
    ghost.currCellContent = gBoard[ghost.location.i][ghost.location.j]
    gBoard[ghost.location.i][ghost.location.j] = GHOST

    // DOM
    renderCell(ghost.location, getGhostHTML(ghost))
}

function getMoveDiff() {
    const randNum = getRandomIntInclusive(1, 4)

    switch (randNum) {
        case 1: return { i: 0, j: 1 }
        case 2: return { i: 1, j: 0 }
        case 3: return { i: 0, j: -1 }
        case 4: return { i: -1, j: 0 }
    }
}

function getGhostHTML(ghost) {
    var color = !gPacman.isSuper ? ghost.color : 'blue'
    return `<span style="color:${color}">${GHOST}</span>`
}

