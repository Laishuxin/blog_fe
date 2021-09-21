export {}
function isObject(o) {
  return (o !== null && typeof o === 'object') || typeof o === 'function'
}
function instanceOf(left: any, right: any) {
  if (!isObject(left) || !isObject(right)) {
    return false
  }

  let proto = left.__proto__
  while (proto !== null) {
    if (proto === right.prototype) {
      return true
    }
    proto = proto.__proto__
  }
  return false
}

function test() {
  class A {}
  class B extends A {}
  class C {}
  console.log(A instanceof B, instanceOf(A, B))
  console.log(A instanceof Object, instanceOf(A, Object))
  console.log(C instanceof B, instanceOf(C, B))
  console.log(C instanceof Object, instanceOf(C, Object))
}

test()
