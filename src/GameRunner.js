//Player turn is indicated from boolean type variable true = X , false = O
let whoseTurn = true;
let isGameEnded = false;
//Matrix button click counter
let stepCounter = 0;
//Array records Player x buttons
let playerX = [];
//Array records Player o buttons
let playerO = [];
//Array records win case if any player got the case right
let winSquaresArray = [];
//Win Streak matrix of Tic Tac Toe game
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
//Game logic runner, it is invoked every time matrix button is clicked
const gameRunner = (id) => {
    //No one can win the game before 5 times any of the buttons is clicked, so we dont invoke controller method
   if (stepCounter <= 3) {
      setPlayerSymbol(id);
      stepCounter++;
   } else {
      setPlayerSymbol(id);
      stepCounter++;
      gameFinisher();
   }
}

//Resets game and initializes new game
const resetGame = () => {
   uncolorizeWinSquares();
   clearAllSquares();
   resetParameters();
   enableAllSquares();
}

//Method sets player symbol into matrix
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

//Game status controller Method -> win x / win 0 / draw
function gameFinisher() {
   for (let i = 0; i < winStreaks.length; i++) {
      if (compareArrays(playerX.sort(), winStreaks[i]) && !isGameEnded) {
         colorizeWinSquares();
         colorizeRestOfTheBoard();
         disableAllSquares();
         isGameEnded = true;
      } else if (compareArrays(playerO.sort(), winStreaks[i]) && !isGameEnded) {
         colorizeWinSquares();
         colorizeRestOfTheBoard();
         disableAllSquares();
         isGameEnded = true;
      } else if (stepCounter == 10 && !isGameEnded && winSquaresArray.length == 0) {
         disableAllSquares();
         colorizeRestOfTheBoard();
         isGameEnded = true;
      }
   }
}

//Compares all win cases with players array
function compareArrays(a, b) {
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

//Paints win case into green
function colorizeWinSquares() {
   for (let i = 0; i < winSquaresArray.length; i++) {
      let winSquare = document.getElementById(winSquaresArray[i]);
      winSquare.style.backgroundColor = "green";
   }
}

//Paints all the squares with red except win cases
function colorizeRestOfTheBoard() {
   for (let i = 1; i < 10; i++) {
      let winSquare = document.getElementById(i);
      if (!(winSquaresArray.includes(i))) {
         winSquare.style.backgroundColor = "red";
      }
   }
}

//It resets color of the boxes back to default color
function uncolorizeWinSquares() {
   for (let i = 1; i < 10; i++) {
      let square = document.getElementById(i);
      square.style.backgroundColor = "#6225E6";
   }
}

//After game is finished with any of the cases game does not let player to choose any of the buttons
function disableAllSquares() {
   for (let i = 1; i < 10; i++) {
      let square = document.getElementById(i);
      square.disabled = true;
   }
}

//After game is resetted, all buttons are enabled back to default
function enableAllSquares() {
   for (let i = 1; i < 10; i++) {
      let square = document.getElementById(i);
      square.disabled = false;
   }
}

//After game is resetted, matrix is cleaned
function clearAllSquares() {
   for (let i = 1; i < 10; i++) {
      let square = document.getElementById(i);
      square.innerHTML = "";
   }
}

//It resets game parameters
function resetParameters() {
   whoseTurn = true;
   stepCounter = 0;
   playerO = [];
   playerX = [];
   winSquaresArray = [];
   isGameEnded = false;
}