const Analyzer = require('./analyzer');
const Grid = require('./grid');

describe('analyzer', ()=>{
    it('should return draw for filled grid without a winner ', ()=>{
        const drawGrid = 'OXOXOXO\n'.repeat(3) + 'XOXOXOX\n'.repeat(3);
        expect((new Analyzer).check(drawGrid, 'X')).toBe(null);
    });

    it('should find a winner if 4 tokens are following each other in the same row', () => {
        const grid = '.......\n'.repeat(5) + 'OOOOXXX\n';
        expect((new Analyzer).check(grid, 'O')).toBe(true);
    });
});
