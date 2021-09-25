---
title: 前端工具 - 构建工具 - vite
time: 2021-08-16
author: ru shui
category: tools
tag:
  - tools
  - vite
visitor: false
article: true
sticky: false
---

## 基本使用

### TypeScript 校验

#### 强校验

vite 天生就支持 TS 的，但是 vite 不对 TS 进行校验，而是直接编译，所以我们需要让 vite 支持
TS 校验。

我们只需要在 build 命令之前加上 `tsc --noEmit` 就可以实现对 TS 的校验。

#### isolatedModules

开启独立模块校验。TS 在编译的时候会帮我们将类似 `interface` 这种类型校验
代码删除。但是，当我们采用模块依赖的时候就可能出现问题。考虑下面的情况：

```typescript
// utils.ts
export interface Utils {
  a: number
}

// test.ts

import { Utils } from './utils'

export { Utils }
```

如果 `isolatedModules: false` 时，TS 会通过校验，但是在浏览器环境下，执行就会出现错误。

为了避免 `Re-exporting` 错误，我们最好在 `tsconfig.json` 中添加 `isolatedModules: true`。

### 处理静态文件

#### types

query

```typescript

```
