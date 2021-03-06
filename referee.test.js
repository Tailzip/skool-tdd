const Referee = require("./referee");
const Grid = require("./grid");
const Analyzer = require("./analyzer");

const O_PLAYER = Referee.O_PLAYER;
const X_PLAYER = Referee.X_PLAYER;

describe("referee", () => {
  it("should start with the O player", () => {
    const grid = new Grid();
    const referee = new Referee(grid);
    referee.play(0);
    expect(grid.render()).toBe(".......\n".repeat(5) + `${O_PLAYER}......\n`);
  });
  it("should switch player after each play", () => {
    const grid = new Grid();
    const referee = new Referee(grid);
    referee.play(0);
    referee.play(1);
    referee.play(2);
    expect(grid.render()).toBe(
      ".......\n".repeat(5) + `${O_PLAYER}${X_PLAYER}${O_PLAYER}....\n`
    );
  });

  it("should ask player to retry he tries to put a 7th token in a column", () => {
    const grid = new Grid();
    const referee = new Referee(grid);

    referee.play(0);
    referee.play(0);
    referee.play(0);
    referee.play(0);
    referee.play(0);
    referee.play(0);
    referee.play(0);
    referee.play(1);

    let expectedGrid = `${X_PLAYER}......\n`;
    expectedGrid += `${O_PLAYER}......\n`;
    expectedGrid += `${X_PLAYER}......\n`;
    expectedGrid += `${O_PLAYER}......\n`;
    expectedGrid += `${X_PLAYER}......\n`;
    expectedGrid += `${O_PLAYER}${O_PLAYER}.....\n`;
    expect(grid.render()).toBe(expectedGrid);
  });

  it("should tell 'O' is a winner", () => {
    const grid = new Grid();
    const referee = new Referee(grid);

    referee.play(0);
    referee.play(1);
    referee.play(0);
    referee.play(1);
    referee.play(0);
    referee.play(1);

    expect(referee.play(0)).toBe(O_PLAYER);
  });

  it("should tell the game is on", () => {
    const grid = new Grid();
    const referee = new Referee(grid);

    referee.play(0);
    referee.play(1);
    referee.play(0);
    referee.play(1);

    expect(referee.play(0)).toBe(false);
  });

  it("should tell the game is draw", () => {
    const grid = new Grid();
    const referee = new Referee(grid);

    referee.play(0);
    referee.play(1);
    referee.play(0);
    referee.play(1);
    referee.play(0);
    referee.play(1);

    referee.play(2);
    referee.play(3);
    referee.play(2);
    referee.play(3);
    referee.play(2);
    referee.play(3);

    referee.play(4);
    referee.play(5);
    referee.play(4);
    referee.play(5);
    referee.play(4);
    referee.play(5);

    referee.play(6);
    referee.play(0);
    referee.play(6);
    referee.play(0);
    referee.play(6);
    referee.play(0);

    referee.play(1);
    referee.play(2);
    referee.play(1);
    referee.play(2);
    referee.play(1);
    referee.play(2);

    referee.play(3);
    referee.play(4);
    referee.play(3);
    referee.play(4);
    referee.play(3);
    referee.play(4);

    referee.play(5);
    referee.play(6);
    referee.play(5);
    referee.play(6);
    referee.play(5);

    expect(referee.play(6)).toBe('draw');
  });
});
