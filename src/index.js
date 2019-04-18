/*
 * @author Youthink
 * @github https://github.com/Youthink
 *
 */
const { Parser } = require('acorn');
const NodeIterator = require('./nodeIterator');
const Scope = require('./scope');

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
    const a = this.nodeIterator.traverse(this.ast, new Scope());
  }
}

module.exports = Runjs;
