---
title: ts - 常用技巧
time: 2021-06-28
author: ru shui
category: typescript
tag:
  - typescript
  - tips
visitor: false
article: true
sticky: false
---

## 提取接口中的 keys 作为 options

```typescript
interface Person {
  name: string
  age: number
}

type OptionsOfPerson = {
  [prop in keyof Person]: boolean
}
```

![](./images/2021-06-28-22-52-21.png)
