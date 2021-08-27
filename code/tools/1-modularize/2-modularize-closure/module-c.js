var moduleC = (function (moduleA) {
  var c = moduleA.a.map(item => item * item)
  return {
    c: c,
  }
})(moduleA)
