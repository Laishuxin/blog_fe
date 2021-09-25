Function.prototype.call2 = function (context, ...args) {
  context = context || window
  const id = Symbol('fn')
  context[id] = this

  const result = context[id](...args)
  delete context[id]
  return result
}

function main() {
  const obj = {
    name: 'obj',
  }
  function show(age) {
    console.log(`name = ${this.name}`)
    console.log(`age = ${age}`)
  }

  show.call2(obj, 12)
}
main()
