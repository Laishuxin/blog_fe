---
title: js - event
time: 2021-06-19
author: ru shui
category: javascript
tag:
  - javascript
  - event
visitor: false
article: true
sticky: false
---

## 浅谈 javascript 中的事件

### 事件捕获与事件冒泡

1. 事件捕获。
   从触发事件的顶层元素开始触发，然后逐渐向底层渗透。
2. 事件冒泡。
   从触发事件的底层元素开始触发，然后逐渐向上层元素开始冒泡。

![ 事件捕获和事件冒泡 - MDN ](https://mdn.mozillademos.org/files/14075/bubbling-capturing.png)

<center>图片来自 MDN</center>

### 事件传播

> 事件传播: 指的是阻止捕获和冒泡阶段中当前事件的进一步传播。
> 但是，它不能防止任何默认行为的发生； 例如，对链接的点击仍会被处理。
> 如果要停止这些行为，请参见 preventDefault 方法，它可以阻止事件触发后默认动作的发生。

### 事件代理

> 事件代理：指的是一个元素的响应事件代理带另外一个元素上。

例如：按照上面的事件冒泡，当点击 `video` 时，会先事件会从子元素传播到父元素上，
于是乎，我们可以之间在父元素上对点击事件进行处理，从而在子元素上响应。

考虑下面的代码：

```html
<ul class="list">
  <li>1</li>
  <li>2</li>
  <li>3</li>
  <li>4</li>
  <li>5</li>
</ul>
<script>
  const lis = document.querySelectorAll('li')

  for (let i = 0, len = lis.length; i < len; i++) {
    lis[i].addEventListener('click', function () {
      console.log(i)
    })
  }
</script>
```

我们通过遍历所有的 `li`，并为其添加点击事件，这种做法的性能要差很多。

但是，我们可以通过事件代理的方式，让顶层的父元素 `list` 监听点击事件即可。

```html
<script>
  const lis = document.querySelectorAll('li')
  const list = document.querySelector('.list')

  list.addEventListener('click', function (e) {
    const target = e.target
    if (target.tagName.toLowerCase() !== 'li') {
      return
    }
    console.log(Array.prototype.indexOf.call(lis, target))
  })
</script>
```

### 示例

case1: 提供一个全局的 `isBanning` 标志，当这个标志位为 `true` 时，
用户所有的点击事件都不起作用。

```javascript
window.addEventListener(
  'click',
  function (e) {
    if (isBanning) {
      e.stopPropagation()
    }
    console.log('window is clicking...')
  },
  true,
)
```

其中需要注意的点就是我们使用了**事件捕获**和 `e.stopPropagation` 才能实现事件
代理和阻止事件传播。
