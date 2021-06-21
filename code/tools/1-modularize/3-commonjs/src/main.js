var moduleA = require('./module-a');
var moduleB = require('./module-b');
var moduleC = require('./module-c');

var a = moduleA.a;
var b = moduleB.b;
var c = moduleC.c;

console.log(`commonjs a = ${JSON.stringify(a)}`);
console.log(`commonjs b = ${JSON.stringify(b)}`);
console.log(`commonjs c = ${JSON.stringify(c)}`);