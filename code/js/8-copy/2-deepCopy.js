const isPlainObject = obj => typeof obj === 'object' && obj !== null

function deepCopy(obj) {
  if (!isPlainObject(obj)) return obj
  const isArray = Array.isArray
  const result = isArray(obj) ? [] : {}
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      const element = obj[key]
      result[key] = isPlainObject(element) ? deepCopy(element) : element
    }
  }
  return result
}

const isArray = Array.isArray
const helper = (obj, key, value, queue) => {
  if (isPlainObject(value)) {
    queue.push([obj, key, value])
  } else {
    obj[key] = value
  }
}
function deepCopyBFS(obj, queue = []) {
  if (!isPlainObject(obj)) return obj
  const result = isArray(obj) ? [] : {}
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      helper(result, key, obj[key], queue)
    }
  }

  while (queue.length) {
    const [obj, key, value] = queue.shift()
    obj[key] = deepCopyBFS(value, queue)
  }

  return result
}

function test1() {
  const obj = {
    a: 'a',
    b: function () {},
    c: { c: 'c' },
  }
  const obj2 = deepCopy(obj)
  console.log(`obj.a === obj2.a ? `, obj.a === obj2.a)
  console.log(`obj.b === obj2.b ? `, obj.b === obj2.b)
  console.log(`obj.c === obj2.c ? `, obj.c === obj2.c)
  console.log(`obj.c.c === obj2.c.c ? `, obj.c.c === obj2.c.c)
}

function test2() {
  const obj = {
    a: 'a',
    b: function () {},
    c: { c: 'c' },
    d: { d: 'd', e: 'e' },
  }
  const obj2 = deepCopyBFS(obj)
  console.log(`obj.a === obj2.a ? `, obj.a === obj2.a)
  console.log(`obj.b === obj2.b ? `, obj.b === obj2.b)
  console.log(`obj.c === obj2.c ? `, obj.c === obj2.c)
  console.log(`obj.c.c === obj2.c.c ? `, obj.c.c === obj2.c.c)
  console.log(`obj.d === obj2.d? `, obj.d === obj2.d)
  console.log(`obj.d.d === obj2.d.d ? `, obj.d.d === obj2.d.d)
  console.log(`obj.d.e === obj2.d.e ? `, obj.d.e === obj2.d.e)
}

function main() {
  // test1()
  test2()
}
main()
