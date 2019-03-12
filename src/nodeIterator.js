const nodeHandler = {
  Program () {},
  VariableDeclaration () {},
  ExpressionStatement () {},
  MemberExpression () {},
  CallExpression () {},
  Identifier () {}
}

class NodeIterator {
  constructor (node) {
    this.node = node;
    this.nodeHandler = nodeHandler;
  }

  traverse (node) {
    const _eval = this.nodeHandler[node.type];
    if (!_eval) {
      throw new Error(`canjs: Unknown node type "${node.type}".`);
    }
    return _eval(node);
  }
}

module.exports = NodeIterator;
