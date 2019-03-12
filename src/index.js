/*
 * @author Youthink
 * @github https://github.com/Youthink
 *
 */
const { Parser } = require('acorn');
const NodeIterator = require('./nodeIterator');

class Runjs {
  constructor(code = '') {
    this.code = code;
    this.ast = Parser.parse(code);
    this.evalutor = null;
    this.init();
  }

  init() {
    this.nodeIterator = new NodeIterator();
  }

  run() {
    const a = this.nodeIterator.traverse(this.ast);
    console.log(a);
  }
}

module.exports = Runjs;
