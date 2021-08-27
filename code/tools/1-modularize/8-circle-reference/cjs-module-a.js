exports.done = false

var b = require('./cjs-module-b')
// moduleA: b.done =  true
console.log('moduleA: b.done = ', b.done)

exports.done = true
// moduleA: module has been loaded, loaded =  true
console.log('moduleA: module has been loaded, loaded = ', exports.done)
