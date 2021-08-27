;(function (moduleA, moduleB, moduleC) {
  var a = moduleA.a
  var b = moduleB.b
  var c = moduleC.c

  console.log(`module closure a = ${JSON.stringify(a)}`)
  console.log(`module closure b = ${JSON.stringify(b)}`)
  console.log(`module closure c = ${JSON.stringify(c)}`)
})(moduleA, moduleB, moduleC)
