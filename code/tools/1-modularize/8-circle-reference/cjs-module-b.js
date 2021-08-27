exports.done = false

var a = require('./cjs-module-a')
// moduleB: a.done =  false
console.log('moduleB: a.done = ', a.done)

exports.done = true
// moduleB: module has been loaded, loaded =  true
console.log('moduleB: module has been loaded, loaded = ', exports.done)
