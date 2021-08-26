---
title: tools - mock
time: 2021-08-16
author: ru shui
category: tools
tag:
  - mock
visitor: false
article: true
sticky: false
---

前端常见的 mock 选型：
1. 代码入侵。即直接在代码中写死的 Mock 数据，或者请求本地的JSON 文件。
   - 优点：临时性比较强。
   - 缺点：不利于后期切换代码环境；所有的 Mock 都需要手动创建，比较繁琐。

2. 请求拦截。（例如 Mock.js）其原理是重写 http.request 方法，对其进行拦截。
   - 优点：可以生成随机数据；前后端分离。
   - 缺点：数据都是动态生成的，无法真实模拟增删改查的情况；只支持 ajax，不支持 fetch。
3. 接口管理工具。（例如：swagger）
   - 优点：配置功能强大，接口管理与 Mock 一体，后端修改接口，Mock 也随之修改。
   - 缺点：配置复杂，依赖后端实现；

4. 本地 node 服务器。
   - 优点：配置简单，json-server 可以快速启动；自定义程度高；可以模拟增删改查。
   - 缺点：无法随后端 API 接口修改而修改。