---
title: ts - infer
time: 2021-06-26
author: ru shui
category: typescript
tag:
  - typescript
  - infer
visitor: false
article: true
sticky: false
---

## 提取 promise 中的类型。

```typescript
type GetPromiseGen<T> = T extends Promise<infer U> ? U : never

interface Person {
  name: string
  age: number
}

let promise: Promise<Person>

type result = GetPromiseGen<Promise<Person>>
```

![](./images/2021-06-28-22-47-25.png)
