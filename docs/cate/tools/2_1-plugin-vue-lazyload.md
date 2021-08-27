---
title: 插件 - vue-lazyload
time: 2021-06-20
author: ru shui
category: tools
tag:
  - tools
  - plugin
visitor: false
article: true
sticky: false
---

（本文基于 [vue-tiny-lazyload-img](https://github.com/mazipan/vue-tiny-lazyload-img) 有感而写）

在 Vue3 中实现图片懒加载的原理：

1. 使用浏览器提供的 `IntersectionObserver` 观察元素是否进入可视区域。
2. 利用 Vue 自定义指令的功能，为图片添加懒加载功能。
3. 使用 `newImage.src = lazyImage.dataset.src` 将图片缓存在用户本地。
4. `newImage.onload` 时，设置 `lazyImage.src = lazyImage.dataset.src`，从而实现来加载。

## 自定义指令

1. 在组件挂载的时候对于元素进行观察。
2. 在组件卸载的时候取消对元素的观察。
3. 在组件更新的时候，重新对组件进行观察。

**注意：**第三点是很有必要的。例如我们选择更新 img 的 `src` 使组件进行更新时，
此时需要重新对元素进行观察，以图片不会重新加载。

```javascript
/**
 * Image lazy load using custom directive.
 * @param { import('vue').App<Element> } app
 */
export default function use(app) {
  if (!app) {
    return
  }
  app.directive('lazy-load', {
    mounted(el) {
      observe(el)
    },
    updated(el) {
      observe(el)
    },
    unmounted(el) {
      unobserve(el)
    },
  })
}
```

## lazy load 的实现

### 状态的改变

首先，我们定义几个状态变换类来标识图片变化过程。

```javascript
export const V_LAZY_LOADING = 'v-lazy-loading'
export const V_LAZY_LOADED = 'v-lazy-loaded'
export const V_LAZY_ERROR = 'v-lazy-error'
```

1. 在图片加载完成之前，我们给图片加上一个 `v-lazy-loading` 的类名。
   即 `<img class="v-lay-loading />` 来标识图片正在加载中。
   其调用时机在我们设置 `newImage.src = lazyImg.dataset.src` 之前。
2. 在图片加载完成的时候，我们给图片加上一个 `v-lazy-loaded` 的类名，
   用于标识图片已经加载完成。其调用时机在 `newImg.onload` 的时候。
3. 在图片加载失败的时候，我们给图片加上一个 `v-lazy-err` 的类名，
   用于标识图片已经加载失败。其调用时机在 `newImg.onerror` 的时候。

还有一点需要注意的是\*\*在对 Image 进行观察之前，应该确保当前 Image 元素上
没有 `v-lazy-loaded` 的类名，这是因为如果组件发生更新的时候，原先已经加载
完成的图片元素可能还携带 `v-lazy-loaded`，所以才有了如下的代码：

```javascript
export function observe(el) {
  if (el.classList.contains(V_LAZY_LOADED)) {
    el.classList.remove(V_LAZY_LOADED)
  }
  io.observe(el)
}
```

### 核心代码

```javascript
// lazy-load/v-lazy-load.js
import { V_LAZY_ERROR, V_LAZY_LOADED, V_LAZY_LOADING } from './constant'

const io = getIntersectionObserver()

function getIntersectionObserver() {
  return new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target
        const src = target.getAttribute('src')
        target.classList.add(V_LAZY_LOADING)
        const dataSrc = target.getAttribute('data-src') || src
        const dataErr = target.getAttribute('data-err') || src

        const newImg = new Image()
        newImg.src = dataSrc
        newImg.onload = () => {
          target.src = dataSrc
          cleanupAndAdd(target, V_LAZY_LOADED)
        }

        newImg.onerror = () => {
          target.src = dataErr
          cleanupAndAdd(target, V_LAZY_ERROR)
        }
        io.unobserve(target)
      }
    })
  })
}

function cleanupAndAdd(target, className) {
  target.removeAttribute('data-src')
  target.removeAttribute('data-err')
  target.classList.remove(V_LAZY_LOADING)
  target.classList.add(className)
}

/**
 * @param { HTMLImageElement } el
 */
export function observe(el) {
  if (el.classList.contains(V_LAZY_LOADED)) {
    el.classList.remove(V_LAZY_LOADED)
  }
  io.observe(el)
}

/**
 * @param { HTMLImageElement } el
 */
export function unobserve(el) {
  io.unobserve(el)
}
```

我们主要向外部暴露两个 API(`observe` 和 `unobserve`) 用于对 Image 元素进行观察与取消观察。

重点是放在 `new IntersectionObserver` 的过程。
我们先获取相应的 Image 元素，然后获取附着在元素上面的 `src`、`data-src` 和
`data-err` 属性。
然后在缓存中创建一个 `Image` 对象并加载相应的图片。

**注意**：此时 DOM 上的 img 还是有图片的，我们可以预先用一个简单的图片填充，
待我们的图片加载完成后，将 DOM 图片 img.src 更换成我们想要的图片链接即可。

其原理是通过浏览器缓存实现的。

## 兼容性问题

对于一些不兼容 `IntersectionObserver` 的浏览器，我们可以使用 `profile` 做一个兼容性处理。
