Function.prototype.bind2 = function (context, ...args) {
  context = context || window
  const fn = Symbol('fn')
  context[fn] = this

  return function (...rest) {
    args = args.concat(rest)
    const result = context[fn](args)
    delete context[fn]
    return result
  }
}

function main() {
  const obj1 = {
    name: 'obj1',
  }
  const obj2 = {
    name: 'obj2',
  }
  function show(age) {
    console.log(`name: ${this.name}, age = ${age}`)
  }
  const bind1 = show.bind2(obj1)
  const bind2 = show.bind2(obj1, 100)
  const bind3 = bind1.bind2(obj2, 11)
  // bind1(0)
  // bind2()
  bind3()
}
main()
