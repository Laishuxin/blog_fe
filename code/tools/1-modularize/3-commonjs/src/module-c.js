var moduleA = require('./module-a');

var c = moduleA.a.map(function (item) { return item * item; })

module.exports = {
  c: c,
}
