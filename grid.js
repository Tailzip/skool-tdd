const rowMax = 6;

function rotate(matrix) {
    let result = [];
    for(let i = 0; i < matrix[0].length; i++) {
        let row = matrix.map(e => e[i]).reverse();
        result.push(row);
    }
    return result;
};

class Grid {
    constructor(){ 
       this.reset()
    }

    render(){
        const tmpGrid = this.grid.map((col, index) => {
            const tmpCol = col;
            const tmpColLength = tmpCol.length;
            for(let i = 0; i <= rowMax - tmpColLength - 1; i++) {
                tmpCol.push('.');
            }

            return tmpCol;
        });

        return rotate(rotate(rotate(tmpGrid))).map(col => col.join('')).join('\n') + '\n';
    }

    add(token,col){
        if (this.grid[col].length === rowMax) {
            throw new Error('Cannot add more than 6 tokens per column!');
        }

        this.grid[col].push(token);
    }

    reset(){
        this.grid = [[], [], [], [], [], [], []];
    }
}

module.exports = Grid;