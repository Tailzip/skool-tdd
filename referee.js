const O_PLAYER = 'O';
const X_PLAYER = 'X';

class Referee {
  constructor(grid) {
    this.currentPlayer = O_PLAYER;
    this.grid = grid;
  }

  play(col) {
      try {
        this.grid.add(this.currentPlayer, col);
        this._switchPlayer();
      } catch(e) {
        console.log(e);
      }
  }

  _switchPlayer(){
    this.currentPlayer = (this.currentPlayer === O_PLAYER) ? X_PLAYER : O_PLAYER
  }
}

module.exports = Referee;
module.exports.O_PLAYER = O_PLAYER;
module.exports.X_PLAYER = X_PLAYER;
