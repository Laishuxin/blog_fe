---
title: js - 小而美的 promise 缓存
time: 2021-09-28
author: ru shui
category: javascript
tag:
  - javascript
  - promise cache
visitor: false
article: true
sticky: false
---

## 问题引出

考虑下面的代码：

```javascript
function getUserById(id) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(`solve id: ${id}`)
      return resolve({ id, name: 'foo' })
    }, 1000)
  })
}

function main() {
  getUserById(1).then(user => console.log(user))
  getUserById(1).then(user => console.log(user))
}
main()
```

我们模拟从服务器获取请求的过程，从控制台输出来看，我们发送了 2 次请求。
但是，有时候我们并不需要发送多次请求，或者说，在一定时间内我们只需发送一次请求，
这时候就需要进行缓存了。

常规的缓存函数的实现可以是如下的方式：

```javascript
function memoized(fn: (...args) => any) {
  const cache = {}
  return function (...args) {
    const key = JSON.stringify(args)
    return cache[key] || (cache[key] = fn.apply(this, args))
  }
}
```

但是，上面的实现方式对于 `Promise` 可能不适用，而且没有提供缓存功能。
下面我们就来实现一个小而美的 `Promise` 缓存函数。

## 没有过期限制的缓存函数

### 实现

```javascript{12-21}
function hash(args) {
  return JSON.stringify(args)
}
function memoized(fn) {
  const cache = {}
  const memoizedFn = function (...args) {
    const key = hash(args)
    if (cache[key]) {
      return cache[key]
    }

    const promise = fn.apply(this, args).then(
      data => data,
      err => {
        throw err
      },
    )
    cache[key] = promise
    promise.catch(_ => {
      cache[key] = null
    })

    return promise
  }
  return memoizedFn
}
```

注意第 12-21 行代码的实现。我们利用 状态改变后的 promise 可以多次调用
`then` 方法的特点实现 `reject` 时清空缓存。

### 简单测试

#### 没有异常的测试

```javascript
const fetchData = (...args) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('....')
      resolve(JSON.stringify(args))
    }, 1000)
  })
}

function main() {
  const memoizedFn = memoized(fetchData)
  memoizedFn(1, 2)
    .then(data => console.log('data: ', data))
    .catch(e => console.log('error: ', e))
  memoizedFn(1, 2)
    .then(data => console.log('data: ', data))
    .catch(e => console.log('error: ', e))
  memoizedFn(2, 2)
    .then(data => console.log('data: ', data))
    .catch(e => console.log('error: ', e))
  setTimeout(() => {
    memoizedFn(1, 2)
      .then(data => console.log('data: ', data))
      .catch(e => console.log('error: ', e))
  }, 2000)
}
main()

/*
....
data:  [1,2]
data:  [1,2]
....
data:  [2,2]
data:  [1,2]
*/
```

可以看到，多次调用函数只会执行一次。

#### 针对异常的测试

```javascript
const fetchData = (...args) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('....')
      reject(JSON.stringify(args))
    }, 1000)
  })
}

function main() {
  const memoizedFn = memoized(fetchData)
  memoizedFn(1, 2)
    .then(data => console.log('data: ', data))
    .catch(e => console.log('error: ', e))
  memoizedFn(1, 2)
    .then(data => console.log('data: ', data))
    .catch(e => console.log('error: ', e))
  memoizedFn(2, 2)
    .then(data => console.log('data: ', data))
    .catch(e => console.log('error: ', e))
  setTimeout(() => {
    memoizedFn(1, 2)
      .then(data => console.log('data: ', data))
      .catch(e => console.log('error: ', e))
  }, 2000)
}
main()

/*
....
error:  [1,2]
error:  [1,2]
....
error:  [2,2]
....
error:  [1,2]
*/
```

可以看到 `reject` 时，缓存失效，也就是我们的目的达到了。

## 带时效的缓存函数

```javascript{5-11,18,33-42}
function hash(args) {
  return JSON.stringify(args)
}

function destroyCacheObj(cache, key) {
  if (!cache[key]) {
    return
  }
  clearTimeout(cache[key].expiredId)
  delete cache[key]
}

function memoized(fn, options = {}) {
  /**
   * @type {{[key in string]: {result: any, expireId: number | null}}}
   */
  const cache = {}
  const { maxAge = 0 } = options

  const memoizedFn = function (...args) {
    const key = hash(args)
    if (cache[key]) {
      return cache[key].result
    }

    const promise = fn.apply(this, args).then(
      data => data,
      err => {
        throw err
      },
    )

    const expireId = maxAge
      ? setTimeout(destroyCacheObj, maxAge, cache, key)
      : null
    cache[key] = {
      result: promise,
      expireId,
    }
    promise.catch(_ => {
      destroyCacheObj(cache, key)
    })

    return promise
  }

  memoizedFn.clear = function () {
    const keys = Object.keys(cache)
    keys.forEach(key => destroyCacheObj(cache, key))
  }
  return memoizedFn
}
```

带时效的缓存函数的实现思路是通过设置定时器，当执行待缓存时，我们开启定时器设置
删除缓存的功能。默认情况下，我们认为 `maxAge = 0` 时为持久缓存。

## Reference

- [promise-memoize](https://github.com/nodeca/promise-memoize)
