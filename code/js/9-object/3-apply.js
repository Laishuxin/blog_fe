Function.prototype.apply2 = function (context, args) {
  if (typeof args !== 'object') {
    throw new TypeError(
      'TypeError: CreateListFromArrayLike called on non-object',
    )
  }

  context = context || window

  const fn = Symbol('fn')
  context[fn] = this

  const result = context[fn](...args)
  delete context[fn]
  return result
}

function main() {
  const obj = {
    name: 'obj',
  }
  function show(age) {
    console.log(`name = ${this.name}, age = ${age}`)
  }
  show.apply2(obj, [111])
}
main()
