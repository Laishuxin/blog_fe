define(function (require, exports, module) {
  var moduleA = require('module-a')
  var c = moduleA.a.map(function (item) {
    return item * item
  })
  return {
    c: c,
  }
})
