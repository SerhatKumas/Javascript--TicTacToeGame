let whoseTurn = true;
let isGameEnded = false;
let stepCounter = 0;
let playerX = [];
let playerO = [];
let winSquaresArray = [];
let winStreaks = [
    [1, 2, 3],
    [1, 5, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [3, 5, 7],
    [4, 5, 6],
    [7, 8, 9]
];
const gameRunner = (id) => {
    if (stepCounter <= 3) {
        setPlayerSymbol(id);
        stepCounter++;
    } else {
        setPlayerSymbol(id);
        stepCounter++;
        gameFinisher();
    }
}

const resetGame = () =>{
    uncolorizeWinSquares();
    clearAllSquares();
    resetParameters();
    enableAllSquares();
    }

function setPlayerSymbol(id) {
    let gameSquare = document.getElementById(id);
    if (whoseTurn) {
        gameSquare.innerHTML = "X";
        playerX.push(Number(id));
        whoseTurn = false;
    } else {
        gameSquare.innerHTML = "O";
        playerO.push(Number(id));
        whoseTurn = true;
    }
    gameSquare.disabled = true;
}

function gameFinisher() {
    for (let i = 0 ; i < winStreaks.length; i++) {
        if(compareArrays(playerX.sort(), winStreaks[i]) && !isGameEnded){
            colorizeWinSquares();
            colorizeRestOfTheBoard();
            disableAllSquares();
            isGameEnded = true;           
        }
        else if(compareArrays(playerO.sort(), winStreaks[i]) && !isGameEnded){
            colorizeWinSquares();
            colorizeRestOfTheBoard();
            disableAllSquares();
            isGameEnded = true;      
        }
        else if(!(compareArrays(playerO.sort(), winStreaks[i])) && stepCounter == 9 && !isGameEnded && winSquaresArray.length==0){
            disableAllSquares();
            colorizeRestOfTheBoard();
            isGameEnded = true;
        }
    }
}

function compareArrays(a, b){
    if (a.length < b.length) return false;
    else {
      for (var i = 0; i < b.length; i++) {
        if (!(a.includes(b[i]))) {
          return false;
        }
      }
      winSquaresArray = b;
      return true;
    }
};

function colorizeWinSquares(){
    for(let i= 0;i<winSquaresArray.length;i++){
        let winSquare = document.getElementById(winSquaresArray[i]);
        winSquare.style.backgroundColor = "green";
    }
}

function colorizeRestOfTheBoard(){
    for(let i= 1;i<10;i++){
        let winSquare = document.getElementById(i);
        if(!(winSquaresArray.includes(i))){
        winSquare.style.backgroundColor = "red";}
    }
}

function uncolorizeWinSquares(){
    for(let i= 1;i<10;i++){
        let square = document.getElementById(i);
        square.style.backgroundColor = "#6225E6";
    }
}

function disableAllSquares(){
    for(let i= 1;i<10;i++){
        let square = document.getElementById(i);
        square.disabled = true;
    }
}

function enableAllSquares(){
    for(let i= 1;i<10;i++){
        let square = document.getElementById(i);
        square.disabled = false;
    }
}
function clearAllSquares(){
    for(let i= 1;i<10;i++){
        let square = document.getElementById(i);
        square.innerHTML="";
    }
}
function resetParameters(){
    whoseTurn = true;
    stepCounter = 0;
    playerO = [];
    playerX = [];
    winSquaresArray = [];
    isGameEnded = false;
}