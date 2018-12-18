const Analyzer = require('./analyzer');
const Grid = require('./grid');

describe('analyzer', ()=>{
    it('should return draw for filled grid without a winner ', ()=>{
        const grid = 'OXOXOXO\n'.repeat(3) + 'XOXOXOX\n'.repeat(3);
        expect((new Analyzer(grid)).check('X')).toBe(null);
    });

    it('should find a winner if 4 tokens are following each other in the same row', () => {
        const grid = '.......\n'.repeat(5) + 'OOOOXXX\n';
        expect((new Analyzer(grid)).check('O')).toBe(true);
    });
    it('should find a winner if 4 tokens are following each other in the same column', () => {
        let grid = '.......\n'.repeat(2)
        grid += 'X......\n'.repeat(4);
        expect((new Analyzer(grid)).check('X')).toBe(true);
    });
    it('should find a winner if 4 tokens are in diagonal from left to right', () => {
        let grid = '.......\n'.repeat(2)
        grid += '...X...\n';
        grid += '..XO...\n';
        grid += '.XOO...\n';
        grid += 'XOOO...\n';
        expect((new Analyzer(grid)).check( 'X')).toBe(true);
    });
    it('should find a winner if 4 tokens are in diagonal from right to left', () => {
        let grid = '.......\n'.repeat(2)
        grid += '...X...\n';
        grid += '...OX..\n';
        grid += '...OOX.\n';
        grid += '...OOOX\n';
        expect((new Analyzer(grid)).check( 'X')).toBe(true);
    });
});


// .......
// .......
// ...X...
// ..XO...
// .XOO...
// XOOO...