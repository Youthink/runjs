const nodeHandler = {
  Program(nodeIterator) {
    if (!nodeIterator.node.body) {
      throw new Error('canjs: not node type body.');
    }

    nodeIterator.node.body.map(o => nodeIterator.traverse(o)); // 不能用省略写法，traverse 可以传递带二个参数
  },

  VariableDeclaration(nodeIterator) {
    nodeIterator.node.declarations.forEach(o => {
      const indentifier = o.id.name;
      const value = o.init ? nodeIterator.traverse(o.init) : undefined;
      nodeIterator.scope.setScope(indentifier, value);
    });
  },

  Identifier(nodeIterator) {
    if (nodeIterator.node.name === 'undefined') {
      return undefined;
    }
    return nodeIterator.scope.getScope(nodeIterator.node.name);
  },

  Literal(nodeIterator) {
    return nodeIterator.node.value;
  },

  ExpressionStatement(nodeIterator) {
    return nodeIterator.traverse(nodeIterator.node.expression);
  },

  CallExpression(nodeIterator) {
    const func = nodeIterator.traverse(nodeIterator.node.callee);
    const args = nodeIterator.node.arguments.map(arg => nodeIterator.traverse(arg));

    let value;
    if (nodeIterator.node.callee.type === 'MemberExpression') {
      value = nodeIterator.traverse(nodeIterator.node.callee.object);
    }
    return func.apply(value, args);
  },

  MemberExpression(nodeIterator) {
    const obj = nodeIterator.traverse(nodeIterator.node.object);
    const { name } = nodeIterator.node.property;
    return obj[name];
  },
};

class NodeIterator {
  constructor(node, scope) {
    this.node = node;
    this.scope = scope;
    this.nodeHandler = nodeHandler;
  }

  traverse(node, scope) {
    const nodeIterator = new NodeIterator(node, scope || this.scope);
    const parse = this.nodeHandler[node.type];
    if (!parse) {
      throw new Error(`canjs: Unknown node type "${node.type}".`);
    }
    return parse(nodeIterator);
  }
}

module.exports = NodeIterator;
