class Analyzer {
    constructor() {
        this.rows = [];
    }

    check(grid, token){
        this._parse(grid);

        const drawGrid = 'OXOXOXO\n'.repeat(3) + 'XOXOXOX\n'.repeat(3);
    
        const fourInARow = this.rows.some((row) => row.includes(token.repeat(4)));

        if (fourInARow) {
            return fourInARow;
        }

        if (grid === drawGrid){
            return null
        }
    }

    _parse(grid) {
        this.rows = grid.split('\n');

        console.log(this.rows.map(row => row.split('')));
    }
}

module.exports = Analyzer;
