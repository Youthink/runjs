const Runjs = require('./src');

new Runjs(`
  let x = 1;
  console.log(x);
`).run();
