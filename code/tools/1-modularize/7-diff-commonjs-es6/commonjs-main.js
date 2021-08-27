var moduleA = require('./commonjs-module-a')

setTimeout(() => {
  console.log('commonjs a = ', moduleA.a) // commonjs a = 0
}, 1000)
