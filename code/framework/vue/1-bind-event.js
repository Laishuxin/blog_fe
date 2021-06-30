const compiler = require('vue-template-compiler');

let r1 = compiler.compile('<div @click="fn()"></div>');
let r2 = compiler.compile('<my-component @click="fn()" @click.native="fn()"></my-component>');

console.log(r1.render);
console.log(r2.render);
  
