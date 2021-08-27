---
title: vite - 解决跨域问题
time: 2021-07-30
author: ru shui
category: tools
tag:
  - vite
  - cross-origin
visitor: false
article: true
sticky: false
---

问题描述：
我们当前处于 `http://localhost:3000`，我们要向服务器 `http://localhost:5000` 发送请求获取数据。

显然这是一个跨域请求，浏览器会拒绝我们的请求。

为了解决跨域问题，vite 为我们提供了代理的机制，让我们实现跨域发送请求。具体的使用步骤如下：

1. 配置 vite。
2. 重新设置请求 url。

## 配置 vite

[vite 官网文档](https://vitejs.cn/config/#server-proxy)已经很详细描述了配置项。
这里以其中一个为例，讲解一下各个字段的作用。

```javascript
export default {
  server: {
    proxy: {
      '/api1': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/fallback/, '')
      }
    }
  }
```

1. target。指向我们要发送的目标服务器的 url。
2. changeOrigin。是否改变源。例如我们当前在`http://localhost:3000`，我们配置的 target 为`http://localhost:5000`如果 changeOrigin 为 false 时，服务器接收到的请求中 origin 将为 `http://localhost:3000`。如果 changeOrigin 为 true 时，则服务器接收到的请求中，origin 将为 `http://localhost:5000`，也就是我们的 target。
3. rewrite。重写请求的 url。

## 重新设置请求的 url

由于设置了代理，所以我们需要修改我们请求的 url，指向代理服务器的 url，也就是 `http://localhost:3000`。
