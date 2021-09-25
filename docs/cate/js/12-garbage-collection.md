---
title: js - 垃圾回收
time: 2021-09-15
author: ru shui
category: javascript
tag:
  - javascript
visitor: false
article: true
sticky: false
---

## 常见的内存泄露

1. 闭包。
2. 未被处理的定时器或回调函数。
3. 意外的全局变量。
4. DOM 对象的引用。

```js
// 1. 闭包
function func() {
  let obj = {}
  return function () {
    return obj
  }
}
let obj = { obj: func()() }

// 2. 未被处理的定时器或回调函数。
// 一般在使用框架的时候，当组件被销毁的时候，没有将定时器进行回收。
const data = loadData()
setInterval(() => {
  // data 如果是对象的话， 会被一直引用。
  document.querySelector('div').innerHTML = JSON.stringify(data)
}, 1000)

// 3. 意外的全局变量。
function func2() {
  a = 1 // 如果使用使用 var 进行声明，则 a 会绑定到全局中。
}
func2()
console.log(window.a) // 1

// 4. DOM 的引用。
const obj = {
  image: document.querySelector('img'),
}
// img 元素被删除，但是 obj 仍然保存其引用。
document.body.removeChild(document.querySelector('img'))
```

**解决方案：**

1. 针对闭包。使用后记得清除。
2. 对于定时器，使用与清除搭配。
3. 对于全局变量，采用 ES6 的 `const` 或 `let` 代替。
4. 对于 DOM 引用。如果需要保存 DOM 结点，则采用 `WeakSet` 或者 `WeakMap` 进行保存。
