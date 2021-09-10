---
title: javascript - this
time: 2021-09-10
author: ru shui
category: 系列文章
tag:
  - javascript
  - this
visitor: false
article: true
sticky: false
---

**注意**：一下内容都是基于 浏览器环境下执行的。

## 函数的直接调用

```javascript
function fn() {
  console.log('hello')
}
fn()
// 等价于
fn.call(window)
```

## 函数作为对象的方法被调用

`this`；谁调用，`this` 指向谁。

```javascript
console.log('函数作为对象的方法被调用')
const person = {
  name: 'foo',
  run(distance) {
    console.log(
      `${this.name} is running with the distance of ${distance} kilometers`,
    )
  },
}
person.run(5)
// 等价于
person.run.call(person, 5)
console.log('---------------')
```

## “特殊情况”

```javascript
console.log('特殊情况...')
var name = 'window' // 相当于 window.name = 'window'
class Student {
  name = 'foo'

  run(distance) {
    console.log(
      `${this.name} is running with the distance of ${distance} kilometers.`,
    )
  }
}
const student = new Student()
student.run(100) // 相当于 student.run.call(student, 100)

function forEach(arr, callback) {
  console.log(this)
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i], i, arr)
  }
}

// 特殊情况
const distances = [100]
// case1: 对象的方法进行调j用
// distances.forEach(dis => student.run(dis))

// case2: point free
// 由于 class 内部默认采用严格模式，this 指向 undefined 而不是 window，
// 所以会直接报错而不是 输出 window is ...
distances.forEach(student.run)
debugger
forEach(distances, student.run)
console.log('---------------')
```

**注意**：es6 class 默认采用严格模式，所以函数的直接调用 `this` 不会指向 window。

同样的错误也会发生在 对象的解构上：

```javascript
class Student {
  name = 'student'
  run() {
    console.log(this.name)
  }
}

const { run } = new Student()
run() // Error
/**
 * Uncaught TypeError: Cannot read properties of undefined (reading 'name')
 * at run (<anonymous>:4:22)
 * at <anonymous>:9:1
 */
```

### 箭头函数中的 this

1. 箭头函数中的 this 是在函数定义的时候就已经绑定了，而不是在函数的执行时进行绑定。
2. 事实上，箭头函数压根就没有自己的 this，这就意味着不能对箭头函数进行 new。
3. 箭头函数内部的 this 继承自父执行上下文中的 this。

```javascript
console.log('箭头函数...')
var name = 'window'
const obj1 = {
  name: 'obj1',
  print: () => {
    console.log('name: ', this.name)
  },
}
obj1.print() // this 继承着父执行上下文，也就是 window。

const obj2 = {
  name: 'obj2',
  // print() {} 语法糖
  print: function () {
    console.log('name: ', this.name)
  },
}
obj2.print() // this 继承父执行上下文，也就是 function 的执行上下文，所以 this 指向 obj2
console.log('----------------')
```

### es6 class 中的箭头函数

```javascript
console.log('es6 箭头函数...')
class Obj1 {
  name = 'obj1'
  print = () => {
    console.log('name: ', this.name)
  }
}
const { print } = new Obj1()
print() // print 和 name 一样，this指向当前实例对象。
```
