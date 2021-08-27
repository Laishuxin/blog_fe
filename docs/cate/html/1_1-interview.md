---
title: 前端面试 - html
time: 2021-06-14
author: ru shui
category: html
tag:
  - html
  - interview
visitor: false
article: true
sticky: false
---

## 语义化标签

1. 何为语义化标签。
   语义化标签指的是合理的标签干合适的任务。
   例如：button 用于做按钮，而不是使用 div 通过修改样式作为按钮。

2. 有哪些语义化标签。
   - 块标签。包括：div, p, header, footer, nav, aside, section, article, h1-h6, ol, ul, li, dl, dt, dd 等。
   - 行内标签。包括：span, a, strong, em, i, del 等。
   - 行内块标签。包括：img, input。

| 标签分类   | 特点                                                                                |
| :--------- | :---------------------------------------------------------------------------------- |
| 块标签     | 1. 独占一行。<br/>2. 默认宽度为父级标签的宽度。<br/>3. 可以直接标明宽高。           |
| 行内标签   | 1. 并行排列。<br/>2. 不可直接标明宽高；宽高由内容决定<br/>                          |
| 行内块标签 | 1. 可以与其他行内元素并排。<br/>2. 可以设置宽高。<br/> 3.本质是一个特殊的行内标签。 |

3. 标签之间如何转换。
   通过 display 的方式可以实现不同类型标签之间的转换。

## display

1. `display: none;` 、 `visibility: hidden`、`opacity: 0` 的区别。
1. 渲染的区别。
   - `display: none`：将元素隐藏，同时元素不占有空间（看不见摸不着）。隐藏后的
     元素不再占有空间，所以会导致重排和重绘。
   - `visibility: hidden`：将元素隐藏，但元素仍占有空间（看不见，摸得着）。元素仍会占用空间，所以只会导致重绘，不会重排。
   - `opacity: 0`：将元素隐藏，但元素仍占有空间。
1. 子元素继承。
   - `display: none`：由于元素完全被隐藏了，所以子元素也被隐藏。
   - `visibility: hidden`：会被子元素继承。子元素可以通过设置 `visibility: visible` 使子元素再现。
   - `opacity: 0`：会被子元素继承。但子元素无法通过 `opacity: 1` 使子元素再现。

## 盒子居中

```html
<style>
  .parent {
    width: 800px;
    height: 800px;
    background: lightgreen;
  }

  .box {
    width: 200px;
    height: 200px;
    background: lightgray;
  }
</style>

// ----
<div class="parent">
  <div class="box"></div>
</div>
```

### 使用定位实现

1. 若知道盒子的宽高。

   ```css
   .parent {
     /* ... */
     position: relative;
   }

   .box {
     /* ... */
     position: absolute;
     top: 50%;
     left: 50%;
     margin-top: -100px;
     margin-left: -100px;
   }
   ```

2. 若不知道盒子的宽高。
   ```css
   /* same as above */
   .box {
     /* ... */
     /* margin-top: -100px; */
     /* margin-left: -100px; */
     transform: translate(-50%, -50%);
   }
   ```

### 使用 flex 实现

```css
.parent {
  /* ... */
  display: flex;
  align-items: center;
  justify-content: center;
}
```

### 使用 js 实现

```js
const parent = document.querySelector('.parent')
const box = document.querySelector('.box')
const unit = 'px'
setCentering(parent, box)

function setCentering(parent, child) {
  setPosition(parent, child)
  const [pWidth, pHeight] = getClientSize(parent)
  const [cWidth, cHeight] = getOffsetSize(child)

  child.style.left = (pWidth - cWidth) / 2 + unit
  child.style.top = (pHeigh - cHeight) / 2 + unit
}

function setPosition(parent, child) {
  parent.style.position = 'relative'
  child.style.position = 'absolute'
}

function getClientSize(element) {
  return [element.clientWidth, element.clientHeight]
}

function getOffsetSize(element) {
  return [element.offsetWidth, element.offsetHeight]
}
```
