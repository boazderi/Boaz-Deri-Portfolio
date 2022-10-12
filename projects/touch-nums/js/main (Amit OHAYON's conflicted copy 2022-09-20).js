'use strict'

// Model
var gNums = []
var boardSize = 5
createBoard(boardSize)
var gChecker = 1

function createBoard(boardSize) {
    //create nums matrix in the table, and array of numbers
    var htmlStr = ''

    for (var i = 1; i <= boardSize ** 2; i++) {
        gNums.push(i)
    }
    for (var i = 0; i < boardSize; i++) {
        htmlStr += '<tr>'
        for (var j = 0; j < boardSize; j++) {
            var numCell = gNums.splice(getRandomInteger(0, gNums.length -1), 1)
            htmlStr += `<td><button class="btn${numCell}" onclick="cellClicked(${numCell})">${numCell}</button></td>`
        }
        htmlStr += '</tr>'
    }
    var elTable = document.querySelector('table')
    elTable.innerHTML = htmlStr
}

function cellClicked(clickedNum) {
    // add an boolean before run the clock
    // runClock()    
    console.log(clickedNum);
    if (clickedNum === gChecker){
        gChecker++
        var currCell = document.querySelector(`.btn${clickedNum}`)
        currCell.style.backgroundColor = "gray"
        currCell.style.color = "white"
    }

    console.log('gChecker',gChecker);

}

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}