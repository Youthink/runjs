const Scope = require('./scope');

const nodeHandler = {
  Program (nodeIterator) {
    if (!nodeIterator.node.body) {
      throw new Error(`canjs: not node type body.`);
    }

    nodeIterator.node.body.map(o => {
      nodeIterator.traverse(o)
    });
  },

  VariableDeclaration (nodeIterator) {
    nodeIterator.node.declarations.map(o => {
      const indentifier = o.id.name;
      const value = o.init ? nodeIterator.traverse(o.init) : undefined;
      nodeIterator.scope.setScope(indentifier, value);
    });
  },

  Identifier (nodeIterator) {
    if (nodeIterator.node.name === 'undefined') {
      return undefined
    }
    return nodeIterator.scope.getScope(nodeIterator.node.name)
  },

  Literal (nodeIterator) {
    return nodeIterator.node.value;
  },

  ExpressionStatement (nodeIterator) {
    return nodeIterator.traverse(nodeIterator.node.expression);
  },

  CallExpression (nodeIterator) {
    const func = nodeIterator.traverse(nodeIterator.node.callee);
    const args = nodeIterator.node.arguments.map(arg => nodeIterator.traverse(arg));

    let value;
    if (nodeIterator.node.callee.type === 'MemberExpression') {
      value = nodeIterator.traverse(nodeIterator.node.callee.object);
    }
    return func.apply(value, args);
  },

  MemberExpression (nodeIterator) {
    const obj = nodeIterator.traverse(nodeIterator.node.object);
    const name = nodeIterator.node.property.name;
    return obj[name];
  }
}

class NodeIterator {
  constructor (node, scope) {
    this.node = node;
    this.scope = scope;
    this.nodeHandler = nodeHandler;
  }

  traverse (node, scope) {
    const nodeIterator = new NodeIterator(node, scope || this.scope);
    const _eval = this.nodeHandler[node.type];
    if (!_eval) {
      throw new Error(`canjs: Unknown node type "${node.type}".`);
    }
    return _eval(nodeIterator);
  }
}

module.exports = NodeIterator;
