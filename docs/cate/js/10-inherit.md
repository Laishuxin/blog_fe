---
title: js - 继承
time: 2021-09-14
author: ru shui
category: javascript
tag:
  - javascript
visitor: false
article: true
sticky: false
---

## new

使用 ES6 实现基本的 `new` 功能。

```javascript
function newObject(constructor, ...args) {
  function F() {}
  F.prototype = constructor.prototype
  const obj = new F()
  const result = constructor.apply(obj, args)
  return typeof result === 'object' && result !== null ? result : obj
}
```
