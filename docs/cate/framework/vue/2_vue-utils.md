---
title: vue2 - 几个有趣的工具函数
time: 2021-07-31
author: ru shui
category: vue
tag:
  - vue
  - framework

visitor: false
article: true
sticky: false
---

## makeMap

```javascript
export function makeMap(
  str: string,
  expectsLowerCase?: boolean,
): (key: string) => true | void {
  const map = Object.create(null)
  const list: Array<string> = str.split(',')
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true
  }
  return expectsLowerCase ? val => map[val.toLowerCase()] : val => map[val]
}
```

创建一个 map，用于缓存常用的字符串。我们知道，vue 是基于
字符串进行模板解析的，为了优化性能，vue 尽可能地采用缓存机制。
makeMap 可以根据传入的字符串，缓存一个 map 并且返回一个函数，
该函数接收一个 `key`，判断该 `key` 是否在 map 中。

例如源码中，用 `makeMap` 创建一个函数用于判断 `key` 是否为内置组件/保留的属性。

```javascript
/**
 * Check if a tag is a built-in tag.
 */
export const isBuiltInTag = makeMap('slot,component', true)

/**
 * Check if a attribute is a reserved attribute.
 */
export const isReservedAttribute = makeMap('key,ref,slot,slot-scope,is')
```

## remove

```javascript
/**
 * Remove an item from an array
 */
export function remove(arr: Array<any>, item: any): Array<any> | void {
  if (arr.length) {
    const index = arr.indexOf(item)
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}
```

原地删除数组中的某一项，返回包含被删除元素的数组，失败无返回。

## cached

```javascript
/**
 * Create a cached version of a pure function.
 */
export function cached<F: Function>(fn: F): F {
  const cache = Object.create(null)
  return (function cachedFn(str: string) {
    const hit = cache[str]
    return hit || (cache[str] = fn(str))
  }: any)
}
```

实现纯函数的缓存。

参考 `cached` 可以写出对于任意参数的 cache 函数。

## 命名管理函数

```javascript
/**
 * Camelize a hyphen-delimited string.
 */
const camelizeRE = /-(\w)/g
export const camelize = cached((str: string): string => {
  return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''))
})

/**
 * Capitalize a string.
 */
export const capitalize = cached((str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1)
})

/**
 * Hyphenate a camelCase string.
 */
const hyphenateRE = /\B([A-Z])/g
export const hyphenate = cached((str: string): string => {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
})
```
