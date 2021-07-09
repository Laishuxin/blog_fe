---
title: 性能优化 - 常见的性能优化
time: 2021-06-20
author: ru shui
category: perform
tag:
  - javascript
  - perform
visitor: false
article: true
sticky: false
---

## 性能优化指标

1. 首屏时间（白屏时间）。
   进入网址后，加载页面到出现内容的时间。
2. 首次可交互时间。
   用户首次可以执行交互的时间。
3. 首次有意义的内容渲染时间。

## 检测工具

- [ google page speed insights ](https://developers.google.com/speed/pagespeed/insights)
- [ GTmetrix](https://gtmetrix.com/reports/www.jdon.com/SVTOjQGB/)

## 性能优化方案

### 只请求当前所需资源

1. 异步路由加载。
2. 图片懒加载。
3. polyfill。（按需加载）
   - [ polyfill ](https://polyfill.io/v3/url-builder)

### 缩减资源体积

1. 缩减打包体积。例如：分块，uglify。
2. gzip 打包压缩。
3. 图片格式的优化与压缩。
   - [tiny png](https://tinypng.com/)
   - 根据不同的分辨率展示不同分辨率的图片。
4. 控制 cookie 大小。

### 时序优化。

1.  `Promise.all`
2.  ssr
3.  prefetch, prerender, preload。
    `<link rel="dns-prefetch" href="xxx.com">`：在加载 HTML 的时候就提前发起 DNS 预解析。
    `<link rel="preconnect" href="xxx.com">：预链接，与预解析类似。`<link rel="preload" as="image" href="https://xxx.png>`：如果改资源的重要性很高，
    可以提前进行预加载。

### 合理利用缓存

1. CDN。
   - CDN 预热。
   - CDN 刷新。
2. 代码层面的缓存。

### 场景优化

#### webp

阿里云的 oss 支持通过链接后面拼参数来作图片的
格式转换，尝试写一下，把任意图片格式转换为 webp，
需要注意什么?

```javascript
/**
 * Wether supports webp.
 * @returns { boolean } true if supports webp, else false.
 */
function checkWebp() {
  try {
    // "data:image/webp;base64,Uxxx"
    return document.createElement('canvas')
            .toDataURL('image/webp')
            .indexOf('data:image/webp');
  } catch (e) {
    return false;
  }
}

const isSupportWebp = checkWebp();

/**
 * Transform url to support webp.
 * @param { string } url 
 * @returns { string } transformed url.
 */
function transformUrl(url) {
  if (!url) {
    throw new Error(`${url} is invalid.`)
  }
  if (isSupportWebp) { return `${url}?xxxx` }
  return url;
}
```

注意事项：
1. 需要判断当前浏览器是否支持 `webp` 格式。
   不同的浏览器的兼容性不同，可以通过 [ can I use ](https://caniuse.com/)
   查看不同浏览器的兼容性。
   落实到代码上，我们首先需要检测是否支持 `webp`，其次在对其进行转换。
2. 执行转换的过程中，还需要考虑到参数传入的问题。
   可能传入的 `url` 为空，也可能传入的 `url` 本身是一个 `base64` 的格式。

