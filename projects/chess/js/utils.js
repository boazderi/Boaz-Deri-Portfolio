function checkStreightDiractions(pieceCoord) {
    var directions = []
    // Left
    if (pieceCoord.j !== 0) {
        var leftCoords = {
            i: pieceCoord.i,
            j: pieceCoord.j - 1
        }
        if (isEmptyCell(leftCoords)) directions.push('left')
    }
    // Right
    if (pieceCoord.j !== 7) {
        var rightCoords = {
            i: pieceCoord.i,
            j: pieceCoord.j + 1
        }
        if (isEmptyCell(rightCoords)) directions.push('right')
    }
    // Up
    if (pieceCoord.i !== 0) {
        var upCoords = {
            i: pieceCoord.i - 1,
            j: pieceCoord.j
        }
        if (isEmptyCell(upCoords)) directions.push('up')
    }
    // Down
    if (pieceCoord.i !== 7) {
        var downCoords = {
            i: pieceCoord.i + 1,
            j: pieceCoord.j
        }
        if (isEmptyCell(downCoords)) directions.push('down')
    }
    return directions

}

function checkAllDirectionCells(pieceCoord, diraction) {
    // check all the epty cells in the direction and return 
    // array of optional cell position objects
    var emptyCells = []
    if (diraction === "right") {
        var rightCoords = { i: pieceCoord.i, j: pieceCoord.j + 1 }
        while (rightCoords.j <= 7) {
            if (isEmptyCell(rightCoords)) {
                emptyCells.push({ i: rightCoords.i, j: rightCoords.j })
                rightCoords.j++
            } else break
        }
    }
    if (diraction === "left") {
        var leftCoords = { i: pieceCoord.i, j: pieceCoord.j - 1 }
        while (leftCoords.j >= 0) {
            if (isEmptyCell(leftCoords)) {
                emptyCells.push({ i: leftCoords.i, j: leftCoords.j })
                console.log('update left');
                leftCoords.j--
            } else break
        }
    }
    if (diraction === "up") {
        var upCoords = { i: pieceCoord.i - 1, j: pieceCoord.j }
        console.log('upCoords', upCoords);
        while (upCoords.i > 0) {
            if (isEmptyCell(upCoords)) {
                emptyCells.push({ i: upCoords.i, j: upCoords.j })
                console.log('update up');
                upCoords.i--
            } else break
        }
    }
    if (diraction === "down") {
        var downCoords = { i: pieceCoord.i + 1, j: pieceCoord.j }
        console.log('downCoords', downCoords);
        while (downCoords.i <= 7) {
            if (isEmptyCell(downCoords)) {
                emptyCells.push({ i: downCoords.i, j: downCoords.j })
                console.log('update down');
                downCoords.i++
            } else break
        }
    }
    // console.log('emptyCells', emptyCells);
    return emptyCells
}