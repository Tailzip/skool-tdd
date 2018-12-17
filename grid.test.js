const Grid = require('./grid');

describe('grid', ()=>{
    it('should render an empty grid',()=>{
        expect((new Grid).render()).toBe('.......\n'.repeat(6))
    });

    it('should add a token to a column',()=>{
        const grid = new Grid();
        grid.add('*', 0);
        expect(grid.render()).toBe('.......\n'.repeat(5)+'*......\n')
    });

    it('should stack tokens on  top of each other', ()=>{
        const grid = new Grid();
        grid.add('*', 0);
        grid.add('*', 0);
        expect(grid.render()).toBe('.......\n'.repeat(4)+'*......\n'+'*......\n')
    });

    it('should reset the grid',()=>{
        const grid = new Grid();
        grid.add('*', 0);
        grid.add('*', 0);
        grid.reset();
        expect(grid.render()).toBe('.......\n'.repeat(6))
    });
    
    it("shouldn't allow more than 6 tokens per column", ()=>{
        const grid = new Grid();
        grid.add('*', 0);
        grid.add('*', 0);
        grid.add('*', 0);
        grid.add('*', 0);
        grid.add('*', 0);
        grid.add('*', 0);
        
        expect(() => {
            grid.add('*', 0);
        }).toThrow();
    });
})
