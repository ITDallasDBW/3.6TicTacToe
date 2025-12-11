//Step1: When we click on a game square, show if it's X or O
//X if it was player 1 and O if it was player 2
//Update the h1 to say whose turn it is

//Step 2: Determine when the game ends
//When you click on a square, check to see the game ended(win or draw)
//Update the text when the game ends

//Step 3: Restart game
//When you click the restart game button, reset the board

const allSquares = document.querySelectorAll(".board__square");
const title = document.querySelector(".board__title");

let currentPlayer = "X";
let gameOver = false;
// let board=['X', 'O', 'X', 'O', 'X', 'O', 'X', 'O', 'X']
let board = new Array(9).fill(undefined);

//When we click on square, want to set innerHTML
// CAN loop thru with i=0, etc. But cleaner to use foreach loop
//AND, foreach gives 2nd argument=index so it's more better
allSquares.forEach((square, i) => {
  //   console.log(square, i);
  //Once we have access to square, we can addEventListener
  square.addEventListener("click", () => {
    if (square.innerHTML || gameOver) {
      return;
    }
    // console.log("clicked");
    square.innerHTML = currentPlayer;
    board[i] = currentPlayer;
    // console.log(board)

    if (checkWin()) {
      console.log("this runs");
      title.innerHTML = `${currentPlayer} Wins!`;
      gameOver = true;
      return;
    }

    if (checkDraw()) {
      console.log("its a draw");
      title.innerHTML = `Draw!`;
      gameOver = true;
      return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    title.innerHTML = `${currentPlayer}'s Turn`;
  });
});

//Step 3 Restart Game
function restartGame() {
  console.log("restart");
  //1. Reset title
  title.innerHTML = `${currentPlayer}'s Turn`;

  //2. Reset DOM
  allSquares.forEach((square) => {
    square.innerHTML = "";
  });
  //3. Reset board
  board = new Array(9).fill(undefined);
  gameOver = false;
}

//Step 2 Winning state:
function checkDraw() {
  console.log(board);
  //if using every, make sure array values exist.
  //every doiesn't loop over empty values.
  //But DOES loop over undefined.
  return board.every((symbol) => {
    if (symbol) {
      return true;
    }
  });
  //OR
  //   for (let i = 0; i < board.length; ++i) {
  //     if (!board[i]) {
  //       return false;
  //     }
  //   }
  //   return true;
}
function checkWin() {
  const winningIndicies = [
    //Horizontal Wins
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    //Vertical
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    //Diagonal
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < winningIndicies.length; ++i) {
    const matchingIndicies = winningIndicies[i];
    // console.log(matchingIndicies);
    let symbol1 = board[matchingIndicies[0]];
    let symbol2 = board[matchingIndicies[1]];
    let symbol3 = board[matchingIndicies[2]];

    if (!symbol1 || !symbol2 || !symbol3) {
      continue;
    }

    if (symbol1 === symbol2 && symbol2 === symbol3) {
      console.log("winner at", matchingIndicies);
      return true;
    }
  }
}
// Horizontal Wins
//0,1,2
//3,4,5
//6,7,8
//Vertical Wins
//0,3,6
//1,4,7
//2,5,8
//Diagonal Wins
//0,4,8
//2,4,6
//So, create board array to compare to winning state
