'use strict'

const PACMAN = '😃';
var gPacman;
function createPacman(board) {
    // create pacman object with location objact and boolean if 
    // is super now
    gPacman = {
        location: {
            i: 3,
            j: 5
        },
        isSuper: false
    }
    // take the board and define the place of pacman
    // on the board
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function movePacman(ev) {
    // This function take key event and moving the pacman

    // if the game is over dont move.
    if (!gGame.isOn) return
    // create object of next location with i and j
    const nextLocation = getNextLocation(ev)

    // if the key is not an arrow dont move 
    if (!nextLocation) return
    // console.log('nextLocation', nextLocation)
    // console.log('gBoard',gBoard);
    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log('NEXT CELL', nextCell)

    if (nextCell === WALL) return
    if (nextCell === FOOD) {
        gFood++
        updateScore(1)
    }
    if (nextCell === CHERRY) updateScore(10)
    if (nextCell === SUPER_FOOD) {
        if (!gPacman.isSuper) superFood()
        else return
    }
    console.log('gFood',gFood);
    if (gFood === gMaxFood) gameOver('win')
    else if (nextCell === GHOST) {
        if (!gPacman.isSuper) {
            gameOver()
            renderCell(gPacman.location, EMPTY)
        } else {
            
            for(var i = 0 ; i < gGhosts.length ; i++){
                if (gGhosts[i].location.i === nextLocation.i &&
                    gGhosts[i].location.j === nextLocation.j){
                    console.log('gGhosts[i].curruntCellContent, FOOD',gGhosts[i].currCellContent, FOOD);
                    if (gGhosts[i].currCellContent === FOOD)
                        gFood++
                        updateScore(1)
                        gGhosts[i].currCellContent = EMPTY
                    ghostKilled(i)
                }
            }
        }
        
    }

    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY

    // update the DOM
    renderCell(gPacman.location, EMPTY)

    // update the model
    gPacman.location = nextLocation
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN

    // update the DOM
    renderCell(gPacman.location, PACMAN)
}

function superFood() {
    console.log('super food');
    updateScore(1)
    gPacman.isSuper = true
    setTimeout(function () {
        gPacman.isSuper = false
        reviveGhosts()
    }, 5000)
}


function getNextLocation(eventKeyboard) {
    // take current location
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    // change current location to next location
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            nextLocation.i--;
            break;
        case 'ArrowDown':
            nextLocation.i++;
            break;
        case 'ArrowLeft':
            nextLocation.j--;
            break;
        case 'ArrowRight':
            nextLocation.j++;
            break;
        default:
            // if the key is not an arrow
            return null;
    }
    return nextLocation;
}