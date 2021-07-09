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

在 Vue 中实现图片懒加载的原理：

1. 使用浏览器提供的 `IntersectionObserver` 观察元素是否进入可视区域。
2. 利用 Vue 自定义指令的功能，为图片添加懒加载功能。
3. 使用 `newImage().src = lazyImage.dataset.src` 将图片缓存在用户本地。
4. `newImage.onload` 时，设置 `lazyImage.src = lazyImage.dataset.src`，从而实现来加载。

核心代码如下：

```javascript
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const lazyImage = entry.target
      lazyImage.classList.add(CLASS_V_LOADING)
      const src = lazyImage.getAttribute('src')
      const dataSrc = lazyImage.getAttribute(DATA_SRC_NAME) || src
      const dataErr = lazyImage.getAttribute(DATA_ERR_NAME) || src

      // ⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇
      const newImage = new Image()
      newImage.src = dataSrc

      newImage.onload = function () {
        lazyImage.classList.remove(CLASS_V_LOADED)
        // ⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇
        lazyImage.src = dataSrc
        clear(lazyImage, CLASS_V_LOADED)
      }

      newImage.onerror = function () {
        lazyImage.classList.remove(CLASS_V_LOADED)
        lazyImage.src = dataErr
        clear(lazyImage, CLASS_V_ERROR)
      }
      io.unobserve(lazyImage)
    }
  })
})
```

主要功能代码已经标出来了，额外的功能是在加载地过程中为图片添加标志位。

最后还有一点要注意：在 Vue 中状态发生更新时，图片也应发生相应的更新。
其代码实现如下：

```javascript
const plugin = {
  install: (Vue) => {
    Vue.directive('lazyload', {
      bind(el) {
        observe(el)
      },
      // Observe image when component update.
      // ⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇
      componentUpdated(el) {
        if (el.classList.contains(CLASS_V_LOADED)) {
          observe(el)
        }
      },
      unbind(el) {
        unobserve(el)
      },
    })
  },
}
```

主要是通过标志位实现的，也就是代码中标记的部分。
