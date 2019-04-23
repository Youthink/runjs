const Runjs = require('./src');

/*
 * 第一步，可以打印值
 */

new Runjs(`
  let x = 'Hello World!';
  console.log(x);
`).run();

/*
 * 第二步， 实现四则运算
 */

new Runjs(`
  const x = 1, y = 2;
  let sum, product;
  sum = x + y;
  product = x * y;
  console.log(sum);
  console.log(product);
  console.log(1 + 2 * 3 / 2);
  console.log(y - x);
  console.log(y/x);
  console.log(y%x);
`).run();
