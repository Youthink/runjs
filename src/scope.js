class Scope {
  constructor () {
    this.globalDeclaration = {};
    this.declaration = Object.create(null); // 每次都新建一个全新的作用域
    this.initStandardLibrary();
  }

  setScope (name, value) {
    if (!this.declaration[name]) {
      this.declaration[name] = value;
    }
  }

  getScope (name) {
    if (this.globalDeclaration[name]) {
      return this.globalDeclaration[name];
    }
    return this.declaration[name];
  }

  initStandardLibrary() {
    this.globalDeclaration.console = console;
  }
}

module.exports = Scope;
