const Runjs = require('./src');

new Runjs(`
  const word = 'Hello world, Runjs!';
  console.log(word);
`).run();

new Runjs(`
  function Hello () {
    console.log('Hello world, Runjs!');
  }
  Hello();
`).run();

new Runjs(`
  let x = 1;
  {
    let y = 2;
    console.log(y);
  }
  console.log(1);
`).run();
