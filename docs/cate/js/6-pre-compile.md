---
title: js - pre-compile
time: 2021-09-10
author: ru shui
category: javascript
tag:
  - javascript
  - pre-compile
visitor: false
article: true
sticky: false
---

## js 预编译阶段的执行过程

1. 创建 AO 对象（供 js 引擎使用）。
2. 形参与变量声明作为 AO 对象的属性名，并初始值为 undefined。
3. 实参与形参相统一。
4. 找函数声明，会覆盖变量的声明。（注意函数声明与函数表达式的区别）
5. 逐行执行。

例题：

```javascript
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
```

1. 创建 AO 对象。
2. 形参与变量声明作为 AO 对象的属性名，并初始值为 undefined。
   ```javascript
   AO = {
     a: undefined,
     c: undefined,
     a: undefined,
     d: undefined,
     b: undefined, // 函数表达式也是变量
   }
   ```
3. 实参与形参相统一。
   ```javascript
   AO = {
     a: 1, // 实参 a = 1
     c: 2, // 实参 c = 2
     a: undefined,
     d: undefined,
     b: undefined, // 函数表达式也是变量
   }
   ```
4. 找函数声明，会覆盖变量的声明。（注意函数声明与函数表达式的区别）

   ```javascript
   AO = {
     a: function a() {},
     c: function c() {},
     a: undefined,
     d: undefined,
     b: undefined, // 函数表达式也是变量
   }
   ```

5. 逐行执行。
   ```javascript
   console.log(a) // [Function: a]
   var a = 123 // a = 123
   console.log(a) // 123
   console.log(c) // [Function: c]
   function a() {}
   if (false) {
     var d = 678
   }
   console.log(d) // undefined
   console.log(b) // undefined
   var b = function () {} // 函数表达式
   console.log(b) // [Function: b]
   function c() {}
   console.log(c) // [Function: c]
   ```
