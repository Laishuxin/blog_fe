---
title: js - copy
time: 2021-09-10
author: ru shui
category: javascript
tag:
  - javascript
  - copy
visitor: false
article: true
sticky: false
---

## 浅拷贝

```javascript
function shallowCopy(obj) {
  if (!obj) return obj
  const result = {}
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      result[key] = obj[key]
    }
  }
  return result
}
```

### API 提供的浅拷贝功能

1. `Object.assign()`
2. `lodash.clone()`
3. ... 展开运算符
4. `Array.prototype.concat`
5. `Array.prototype.slice`

## 深拷贝

### 深度优先版深拷贝

```javascript
function deepCopy(obj) {
  if (!isPlainObject(obj)) return obj
  const isArray = Array.isArray
  const result = isArray(obj) ? [] : {}
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      const element = obj[key]
      result[key] = isPlainObject(element) ? deepCopy(element) : element
    }
  }
  return result
}
```

### 广度优先深拷贝

```javascript
const isArray = Array.isArray
const result = isArray(obj) ? [] : {}
const helper = (obj, key, value, queue) => {
  if (isPlainObject(value)) {
    queue.push([obj, key, value])
  } else {
    obj[key] = value
  }
}
function deepCopyBFS(obj, queue = []) {
  if (!isPlainObject(obj)) return obj
  if (obj instanceof Date) return new Date(obj)
  if (obj instanceof RegExp) return new RegExp(obj)

  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      helper(obj, key, obj[key], queue)
    }
  }

  while (queue.length) {
    const [obj, key, value] = queue.shift()
    obj[key] = deepCopyBFS(value, queue)
  }

  return result
}
```

### json 实现深拷贝

```javascript
const copy = obj => JSON.parse(JSON.stringify(obj))
```

**注意**：对于一些不可以序列化的属性会出现错误。
