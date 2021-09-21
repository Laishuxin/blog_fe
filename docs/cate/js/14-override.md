---
title: js - 手写部分原生函数
time: 2021-09-21
author: ru shui
category: javascript
tag:
  - javascript
  - override
visitor: false
article: true
sticky: false
---

## typeof

```typescript
// Object.prototype.toString.call(v) === [object Xxxx]
const typeOf = (v: any) => {
  return Object.prototype.toString.call(v).slice(8, -1).toLowerCase()
}
```

## 数组去重

```typescript
const unique = (arr: any[]) => Array.from(new Set(arr))
const unique2 = (arr: any[]) =>
  arr.filter((item, index) => {
    for (var i = index + 1; i < arr.length; i++) {
      if (item === arr[i]) {
        return false
      }
    }
    return true
  })
```

## 数组扁平化

```typescript
// 深度优先
function flatten(arr: any[]) {
  return arr.reduce(
    (prev, curr) => prev.concat(Array.isArray(curr) ? flatten(curr) : curr),
    [],
  )
}

// 广度优先，需要借助队列
function flatten2(arr: any[]) {
  let result = []
  let queue: any[][] = [arr]
  while (queue.length) {
    const task = queue.shift()
    for (let i = 0; i < task.length; i++) {
      if (Array.isArray(task[i])) {
        queue.push(task[i])
      } else {
        result.push(task[i])
      }
    }
  }

  return result
}
```

## 拷贝

### 浅拷贝

```typescript
function shallowCopy(v: any) {
  if (typeof v !== 'object') {
    return v
  }
  const keys = Reflect.ownKeys(v)
  const result = Array.isArray(v) ? [] : {}
  for (const key of keys) {
    result[key] = v[key]
  }
  return result
}
```

### 深拷贝

```typescript
const isPlainObject = (v: any) => typeof v === 'object' && v !== null

// 深度优先 + 递归
const map = new Map()
function deepCopy(v: any) {
  if (!isPlainObject(v)) {
    return v
  }

  const keys = Object.keys(v)
  const result = Array.isArray(v) ? [] : {}
  map.set(v, result)
  for (const key of keys) {
    // result[key] = isPlainObject(v[key]) ? deepCopy(v[key]) : v[key]
    if (isPlainObject(v[key])) {
      let copy = map.get(v[key])
      if (copy) {
        result[key] = copy
      } else {
        copy = deepCopy(v[key])
        map.set(v[key], copy)
        result[key] = copy
      }
    } else {
      result[key] = v[key]
    }
  }
  return result
}

// 广度优先 + 非递归。
const map2 = new Map()
function deepCopy2(v: any) {
  if (!isPlainObject(v)) {
    return v
  }

  const result = Array.isArray(v) ? [] : {}
  map2.set(v, result)
  const queue: any[][] = [[v, result]]

  while (queue.length) {
    const [origin, target] = queue.shift()
    const keys = Object.keys(origin)
    for (const key of keys) {
      if (!isPlainObject(origin[key])) {
        target[key] = origin[key]
      } else {
        const copy = map2.get(origin[key])
        if (copy) {
          target[key] = copy
        } else {
          target[key] = Array.isArray(origin[key]) ? [] : {}
          queue.push([origin[key], target[key]])
        }
      }
    }
  }

  return result
}
```

## instanceof

```typescript
function isObject(o) {
  return (o !== null && typeof o === 'object') || typeof o === 'function'
}
function instanceOf(left: any, right: any) {
  if (!isObject(left) || !isObject(right)) {
    return false
  }

  let proto = left.__proto__
  while (proto !== null) {
    if (proto === right.prototype) {
      return true
    }
    proto = proto.__proto__
  }
  return false
}
```
