/** Connect Four
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 **/

let currPlayer = 1; // active player: 1 or 2

class Game {
  constructor(){
    // board = array of rows, each row is array of cells  (board[y][x])
    // y - vertical from top, also number of which array in array of arrays
    // x - horizontal from left, which element in the chosen array [y]
    this.board = [];
    this.boardHeight = 6;
    this.boardWidth = 7;
    this.gameWon = false;
    for (let y = 0; y < this.boardHeight; y++) {
      this.board.push(Array.from({ length: this.boardWidth }));
      // instead of [undefined, undefined, unde...]
    }
    this.makeGameBoard();
  }

  makeGameBoard(){
    // makeHtmlBoard: make HTML table and row of column tops.
    const gameBoard = document.getElementById('board');
    const top = document.createElement('tr');
    // make column tops (clickable area for adding a piece to that column)
    top.setAttribute('id', 'column-top');
    top.addEventListener('click', this.handleClick.bind(this));

    for (let x = 0; x < this.boardWidth; x++) {
      const headCell = document.createElement('td');
      headCell.setAttribute('id', x);
      top.append(headCell);
    }
    gameBoard.append(top);

    // make all the rows underneath where you drop the piece
    for (let y = 0; y < this.boardHeight; y++) {
      const row = document.createElement('tr');

      for (let x = 0; x < this.boardWidth; x++) {
        const cell = document.createElement('td');
        cell.setAttribute('id', `${y}-${x}`);
        row.append(cell);
      }

      gameBoard.append(row);
    }
  }

  //placeInTable: update DOM to place piece into HTML table of board
  placeInTable(y, x) {
    const piece = document.createElement('div');
    piece.classList.add('piece');
    piece.classList.add(`p${currPlayer}`);
    piece.style.top = -50 * (y + 2);

    const spot = document.getElementById(`${y}-${x}`);
    spot.append(piece);
  }

  // findSpotForCol: given column x, return top empty y (null if filled)
  findSpotForCol(x) {
    for (let y = this.boardHeight - 1; y >= 0; y--) {
      if (!this.board[y][x]) {
        return y;
      }
    }
    return null;
  }

  handleClick(evt) {
    // get x from ID of clicked cell
    const xLoc = +evt.target.id;
    // get next spot in column (if none, ignore click)
    const yLoc = this.findSpotForCol(xLoc);
    if (yLoc === null) {
      return;
    }
    if(!this.gameWon){
      // place piece in board and add to HTML table
      this.board[yLoc][xLoc] = currPlayer;
      this.placeInTable(yLoc, xLoc);

      // check for win
      if (this.checkForWin()) {
        this.gameWon = true;
        return this.endGame(`Player ${currPlayer} won!`);
      }

      // check for tie
      if (this.board.every(row => row.every(cell => cell))) {
        this.gameWon = true;
        return this.endGame('Tie!');
      }

      // switch players
      currPlayer = currPlayer === 1 ? 2 : 1;
    }
  }

  checkForWin() {
    function _win(cells) {
      // Check four cells to see if they're all color of current player
      //  - cells: list of four (y, x) cells
      //  - returns true if all are legal coordinates & all match currPlayer

      return cells.every(
        ([y, x]) =>
          y >= 0 &&
          y < this.boardHeight &&
          x >= 0 &&
          x < this.boardWidth &&
          this.board[y][x] === currPlayer
      );
    }

    for (let y = 0; y < this.boardHeight; y++) {
      for (let x = 0; x < this.boardWidth; x++) {
        // get "check list" of 4 cells (starting here) for each of the different
        // ways to win
        const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
        const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
        const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
        const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

        // find winner (only checking each win-possibility as needed)
        if (_win.call(this, horiz) || _win.call(this,vert) || _win.call(this,diagDR) || _win.call(this,diagDL)) {
          return true;
        }
      }
    }
  }

  // endGame: announce game end
  endGame(msg) {
    alert(msg);
  }

  destroyGame(){
    const board = document.getElementById('board');
      // clear html board
      this.gameWon = false;
      while(board.firstChild){
        board.removeChild(board.firstChild);
      }
      //clear this.board
      this.board = [];
  }
}

