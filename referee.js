const O_PLAYER = "O";
const X_PLAYER = "X";
const Analyzer = require('./analyzer');

class Referee {
  constructor(grid) {
    this.currentPlayer = O_PLAYER;
    this.grid = grid;
  }

  play(col) {
    try {
      this.grid.add(this.currentPlayer, col);

      const status = this._status();

      if (status === true) {
        return this.currentPlayer;
      } else if (status === null) {
        return 'draw';
      }

      this._switchPlayer();
      return false;
    } catch(e) {
      // console.log(e);
      throw new Error(e.message);
    }
  }

  getCurrentPlayerToken() {
    return this.currentPlayer;
  }

  _switchPlayer(){
    this.currentPlayer = (this.currentPlayer === O_PLAYER) ? X_PLAYER : O_PLAYER
  }

  _status(){
    const analyzer = new Analyzer(this.grid.render());
    return analyzer.check(this.currentPlayer)
  }
}

module.exports = Referee;
module.exports.O_PLAYER = O_PLAYER;
module.exports.X_PLAYER = X_PLAYER;
