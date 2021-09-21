// 2. 原型链继承
export {}

function inherit1() {
  function Animal(type) {
    this.type = type
    this.colors = ['red', 'green']
  }

  Animal.prototype.show = function () {
    console.log(this.colors)
  }

  function Dog(type) {
    Animal.call(this, type)
  }

  Dog.prototype = new Animal(undefined)
  Dog.prototype.constructor = Dog
  Dog.prototype.showType = function () {
    console.log(this.type)
  }

  function test1() {
    const dog = new Dog('dog1')
    dog.colors.push('yellow')
    const dog2 = new Dog('dog2')
    dog.showType()
    dog.show()
    dog2.showType()
    dog2.show()
    console.log('dog instanceof Dog', dog instanceof Dog)
    console.log('dog instanceof Animal', dog instanceof Animal)
  }
  test1()
}

function inherit2() {
  function create(o) {
    function F() {}
    F.prototype = o
    return new F()
  }
  function inherit(Child, Parent) {
    Child.prototype = create(Parent.prototype)
    Child.prototype.constructor = Child
    return Child
  }

  function Parent(id) {
    this.id = id
    this.arr = [1, 2]
    console.log('call parent constructor')
  }
  Parent.prototype.show = function () {
    console.log('arr: ', this.arr)
  }

  function Child(id, age) {
    Parent.call(this, id)
    this.age = age
  }
  inherit(Child, Parent)
  Child.prototype.add = function (n) {
    this.arr.push(n)
  }

  function test() {
    const child1 = new Child(1, 1)
    const child2 = new Child(2, 2)
    child1.add(1)
    child1.show()
    child2.show()
  }
  test()
}

function main() {
  // inherit1()
  inherit2()
}
main()
