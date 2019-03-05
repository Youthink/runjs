/*
 * @author Youthink
 * @github https://github.com/Youthink
 *
 */
const { Parser } = require('acorn');

class Runjs {
  constructor(code = '') {
    this.code = code;
    this.ast = Parser.parse(code);
  }

  run() {
    console.log(this.ast);
  }
}

module.exports = Runjs;
