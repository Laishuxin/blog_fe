---
title: js - 防抖
time: 2021-06-20
author: ru shui
category: javascript
tag:
  - javascript
  - throttle
visitor: false
article: true
sticky: false
---

## 引例

我们现在需要实现这样的功能：每隔 n 秒触发一个事件。这个需求与防抖类似，最大的区别是 n 秒后还可以继续执行该事件的回调函数。

## 基本概念

> 节流：持续触发事件，则每隔一段时间才会执行该事件。

## 实现

节流的只要实现有两种方式：

- 时间戳
- 定时器

下面我们将一一道来。

### version1: 时间戳

```ts
function throttle(fn: Function, wait = 1000): Function {
  let previous = 0
  return function (...args: any[]) {
    let now = +new Date()
    let result: any

    if (now - previous >= wait) {
      result = fn.apply(this, args)
      previous = now
    }
    return result
  }
}
```

采用时间戳的方式特别简单，只需要判读当前时间减去之前的时间是否超过要求，是的话就执行函数即可。需要注意的点就是，执行完函数后，记得将`previous = now`。

### version2: 定时器

```ts
function throttle(fn: Function, wait = 3000): Function {
  let timeout: number = null
  let result: any
  return function (...args: any[]) {
    if (timeout === null) {
      // result = fn.apply(this, args)
      timeout = setTimeout(() => {
        fn.apply(this, args)
        timeout = null
      }, wait)
    }
    return result
  }
}
```

使用定时器与使用时间戳的区别在于，定时器可以让我们延长执行回调函数。

既然两种实现方式各有特色，那么我们能否将两种实现方式组合起来，实现特殊需求？

### version3: 时间戳 + 定时器

#### 1. 触发后立刻执行，停止后再次执行

```ts
function throttle(fn: Function, wait = 1000): Function {
  //* in order to execute callback the first time
  let previous = 0
  let timeout: number | null = null
  const clear = () => {
    clearTimeout(timeout)
    timeout = null
  }

  return function (...args: any[]) {
    let result: any
    let now = +new Date()
    // debugger

    // the rest time to execute
    //! to avoid the time of system has been modify
    // if time has been forward, it will be very dangerous
    // if time has been backward, it will be waiting for more time to execute.
    let remaining = wait - (now - previous)

    if (remaining <= 0 || remaining > wait) {
      if (timeout !== null) clear()
      previous = now
      result = fn.apply(this, args)
    } else if (timeout === null) {
      timeout = setTimeout(() => {
        fn.apply(this, args)
        previous = +new Date()
        timeout = null
      }, remaining)
    }

    return result
  }
}
```

这里就是将上面两个版本进行重叠，然后处理连接逻辑即可。
先看最初的实现：

```ts
function throttle(fn: Function, wait = 1000): Function {
  let previous = 0
  let timeout: number | null = null

  const clear = () => {
    clearTimeout(timeout)
    timeout = null
  }
  return function (...args: any[]) {
    let result: any
    let now = +new Date()

    let remaining = wait - (now - previous)
    if (remaining <= 0 || remaining > wait) {
      previous = now
      result = fn.apply(this, args)
    }

    if (timeout === null) {
      timeout = setTimeout(() => {
        fn.apply(this, args)
        timeout = null
      }, wait)
    }
    return result
  }
}
```

我们只是将超时的计算换成`remaining = wait - (now - previous)`，这样做的好处在于可以放置用户修改时间，其次就是在等下的逻辑连接处，可以正确计算剩余时间。

关键点在于如何处理连接。
事实上，从上面的两个版本我们可以知道，只要其中一个版本就可以实现每隔 n 秒执行一次回调函数。所以我们可以采用一个 if-else if 来确保当前只有一个版本在执行。
也就是其中的：

```ts
if (remaining <= 0 || remaining > wait) {
} else if (timeout === null) {
}
```

其次，我们还需要处理一下中间的逻辑：

1. 当执行时间戳版本时，确保定时器版本不会执行。
2. 当执行定时器版本时，确保时间戳版本不会执行。

转换成如下代码：

```ts
if (remaining <= 0 || remaining > wait) {
  if (timeout !== null) clear() // ensure timer version will not execute.
} else if (timeout === null) {
  previous = +new Date() // ensure timestamp version will not execute.
}
```

### version4: leading && trailing

```ts{20,33}
function throttle(
  fn: Function,
  wait = 1000,
  { leading = true, trailing = false }: LeadingAndTrailing = {
    leading: true,
    trailing: false
  }
): Function {
  //* in order to execute callback the first time
  let previous = 0
  let timeout: number | null = null
  const clear = () => {
    clearTimeout(timeout)
    timeout = null
  }

  return function (...args: any[]) {
    let result: any
    let now = +new Date()
    previous = leading ? previous : now
    // debugger

    // the rest time to execute
    //! to avoid the time of system has been modify
    // if time has been forward, it will be very dangerous
    // if time has been backward, it will be waiting for more time to execute.
    let remaining = wait - (now - previous)

    if (remaining <= 0 || remaining > wait) {
      if (timeout !== null) clear()
      previous = now
      result = fn.apply(this, args)
    } else if (timeout === null && trailing) {
      timeout = setTimeout(() => {
        fn.apply(this, args)
        previous = +new Date()
        timeout = null
      }, remaining)
    }

    return result
  }
}
```

我们值需修改其中两行代码就可以实现该功能：
`previous = leading ? previous : now`，如果我们需要触发事件时就执行回调函数，这个时候`previous = previous`也就是跟我们之前实现一样，当`leading = false`时，我们调整一下时间，使得`remaining`落在在不执行区间里面，所以不会立刻执行回调函数。

同样的道理，我们只需要在离开时执行回调函数处，加以判断即可，也就是`else if (timeout === null && trailing)`。

### version4: leading && trailing

### version6: 取消

```ts
throttledFn.cancel = () => {
  clear()
  previous = 0
}
```

我们只需要将返回的函数作为匿名函数，同时，添加上上面的取消函数即可。

## 应用场景

和防抖一样，节流也是应用在高频触发的函数上。节流常用的高频函数有输入框的输入等。
以输入框的输入为例，当用户输入时，我们会根据用户的输入返回特定的提示，这里需要用到就是节流而非防抖。

## reference

- [JavaScript 专题之跟着 underscore 学节流](https://github.com/mqyqingfeng/Blog/issues/26)
