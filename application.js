const Referee = require("./referee");
const Grid = require("./grid");
const readline = require("readline");
const figlet = require("figlet");
const colors = require("colors");
const stdin = process.stdin;
const stdout = process.stdout;
const MAX = 6;
const MIN = 0;

readline.emitKeypressEvents(stdin);
stdin.setEncoding("utf8");

if (stdin.isTTY) {
  stdin.setRawMode(true);
}

// ⚪️🔴🔵

class Application {
  constructor() {
    this.grid = new Grid();
    this.referee = new Referee(this.grid);
    this.value = 0;
  }

  _clear() {
    stdout.write("\x1B[2J\x1B[0f");
    stdout.write("\r");
  }

  _header() {
    stdout.write(figlet.textSync("PUISSANCE QUATRE", "Calvin S").red);
    stdout.write("\n\n");
  }
  _grid() {
    stdout.write("\r" + this._tokenDisplayReplace(this.grid.render()));
  }

  start() {
    this._clear();
    this._header();
    this._picker();
    this._grid();
    this._onKeypress();
  }

  _picker() {
    const currentPlayerToken = this._tokenDisplayReplace(
      this.referee.getCurrentPlayerToken()
    );

    stdout.write(
      new Array(this.value + 1).join("   ") +
        currentPlayerToken +
        new Array(MAX - this.value + 1).join("   ") +
        "(" +
        (this.value + 1) +
        ")\n"
    );
  }

  _onKeypress() {
    stdin.on("keypress", (chunk, key) => {
      let status;
      let error = false;
      this._clear();
      this._header();

      if (key.name === "right") {
        if (this.value < MAX) {
          this.value++;
        }
      }

      if (key.name === "left") {
        if (this.value > MIN) {
          this.value--;
        }
      }

      if (key.name === "space") {
        try {
            status = this.referee.play(this.value);
        } catch(e) {
            error = 'You cannot play in that colmun anymore!'.red;
        }
      }

      if (typeof status === "string") {
        this.grid.reset();
        this.value = 0;
      }

      this._picker();
      this._grid();

      if (typeof status === "string") {
          stdout.write(`\n🎊  🎉  ${status}  wins! 🎊  🎉`.green.bold);
      }

      if (error && error !== '') {
          stdout.write('\n' + error);
      }

      if (key.sequence === "\u0003") {
        process.exit();
      } // ctrl-c

      return;
    });
  }

  _tokenDisplayReplace(str) {
    return str
      .replace(/X/g, " 🔴 ")
      .replace(/O/g, " 🔵 ")
      .replace(/\./g, " ⚪️ ");
  }
}

const app = new Application();
app.start();
module.exports = Application;
