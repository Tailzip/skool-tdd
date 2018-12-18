class Analyzer {
  constructor(grid) {
    this.rows = [];
    this.columns = [];
    this.diagonals = [];
    this.grid = grid;
    this._parse();
  }

  check(token) {
    const draw = this.columns.every(col => col.indexOf(".") === -1);
    const fourInARow = this._fourIn(this.rows, token);
    const fourInAColumn = this._fourIn(this.columns, token);
    const fourInADiagonal = this._fourIn(this.diagonals, token);

    if (fourInARow || fourInAColumn || fourInADiagonal) {
      return true;
    } else if (draw) {
      return null;
    }

    return false;
  }

  _parse() {
    this._parseRows();
    this._parseColumns();
    this._parseDiagonals();
    this._parseDiagonals(false);
  }
  _fourIn(arr, token) {
    return arr.some(str => str.includes(token.repeat(4)));
  }

  _parseDiagonals(ltr = true) {
    const columns = ltr ? this.columns : this.columns.reverse();
    columns.forEach((col, colIndex) => {
      col.split("").forEach((char, index) => {
        const diagonal = [];
        diagonal.push(char);
        for (let i = 1; i < 7; i++) {
          if (columns[colIndex + i]) {
            diagonal.push(columns[colIndex + i].charAt(index + i));
          }
        }
        this.diagonals.push(diagonal.join(""));
      });
    });
  }
  _parseColumns() {
    this.rows.reverse().forEach(row => {
      row.split("").forEach((char, i) => {
        if (!this.columns[i]) {
          this.columns[i] = [];
        }
        this.columns[i].push(char);
      });
    });
    this.columns = this.columns.map(col => col.join(""));
  }

  _parseRows() {
    this.rows = this.grid.split("\n");
  }
}

module.exports = Analyzer;
