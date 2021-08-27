define('module-c', ['module-a'], function (moduleA) {
  var c = moduleA.a.map(function (item) {
    return item * item
  })
  return {
    c: c,
  }
})
