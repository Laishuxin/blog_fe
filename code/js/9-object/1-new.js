// eslint-disable
function newObject(constructor, ...args) {
  function F() {}
  F.prototype = constructor.prototype
  const obj = new F()

  const result = constructor.apply(obj, args)
  return typeof result === 'object' && result !== null ? result : obj
}

function Person(name) {
  this.name = name
}

Person.prototype.show = function () {
  console.log(`name = ${this.name}`)
}

function main() {
  const person = newObject(Person, '小明')
  console.log(person.name)
  person.show()
}

main()
