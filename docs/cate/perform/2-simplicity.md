---
title: 性能优化 - 代码简洁
time: 2021-06-22
author: ru shui
category: perform
tag:
  - javascript
  - perform
visitor: false
article: true
sticky: false
---


## 多条件 if 语句

```javascript
let x = 'abc';
// longhand
if ( x === 'abc' || x === 'edf' || x === 'gh') {
  console.log('statements...');
}

// shorthand
if ([ 'abc', 'edf', 'gh' ].includes(x)) {
  console.log('statements...');
}
```

## 变量赋值

```javascript
// 多变量赋值
let x1 = 1;
let y1 = '2';
let z1 = 3;
console.log(x1, y1, z1);

let [ x2, y2, z2 ] = [1, '2', 3];
console.log(x2, y2, z2);
```

## null、undefined 检查和默认值赋值

```javascript
let x = '';
let y = '';
// longhand
if (x !== null || x !== undefined || x !== '') {
  y = x;
}
console.log('y = ', y);

// shorthand
y = x || '';
console.log('y = ', y);
```

```javascript
let x = '';
let defaultVal = 'default';
x = x || defaultVal;
console.log('x = ', x);
```

使用 es6 最新语法实现默认赋值。
```javascript
let x = null;
let defaultVal = 'default';
x = x ?? defaultVal;
console.log('x = ', x); // x = default;
x = '';
x = x ?? defaultVal;
console.log('x = ', x); // x = 
```
## switch 简化

```javascript
// switch 简化.
let x = 'x1';
function case1() { console.log('case1: x = ', x); };
function case2() { console.log('case2: x = ', x); };
function case3() { console.log('case3: x = ', x); };
// longhand
switch (x) {
  case 'x1':
    case1();
    break;
  case 'x2':
    case2();
    break;
  default:
    case3();
}

// shorthand
let branches = {
  'x1': case1,
  'x2': case2,
  'default': case3,
};
(branches[x] || branches['default'])();
```

## 数组展开与克隆

```javascript
// 数组展开。
let x = [1, 2, 3],
    y = [4, 5, 6];

// longhand
let merge1 = x.concat(y);
console.log(merge1);

// shorthand (may be....)
let merge2 = [...x, ...y];
console.log(merge2);

// 拷贝.
let x = [1, 2, 3];
// longhand
let clone1 = x.slice();

// shorthand
let clone2 = [...x];
```
## 对象解构

```javascript
// 对象解构
let x = {
  field1: 'field1',
  field2: 'field2',
  field3: 'field3',
};

let { field1, field2, defaultVal = 'default' } = x;
console.log(field1, field2, defaultVal);
```

## 数组查询

```javascript
let x = [
  { name: 'name1', data: 'data1' },
  { name: 'name2', data: 'data2' },
  { name: 'name3', data: 'data3' },
];
let result;
// longhand
for (let entry of x)  {
  if (entry.name === 'name2') { result = entry; }
}
console.log('result = ', result);

// shorthand
result = null;
result = x.find(item => item.name === 'name2');
console.log('result = ', result);
```

## 对象遍历

```javascript
let x = {
  field1: 'field1',
  field2: 'field2',
  field3: 'field3',
};

for (const [key, value] of Object.entries(x)) {
  console.log('key = ', key, ', value = ', value);
}

for (const key of Object.keys(x)) {
  const value = x[key];
  console.log('key = ', key, ', value = ', value);
}
```
