function fn(a, c) {
  console.log(a)
  var a = 123
  console.log(a)
  console.log(c)
  function a() {}

  if (false) {
    var d = 678
  }

  console.log(d)
  console.log(b)
  var b = function () {} // 函数表达式
  console.log(b)
  function c() {}
  console.log(c)
}

fn(1, 2)
