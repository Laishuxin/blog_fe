export {}
function shallowCopy(v: any) {
  if (typeof v !== 'object') {
    return v
  }
  const keys = Reflect.ownKeys(v)
  const result = Array.isArray(v) ? [] : {}
  for (const key of keys) {
    result[key] = v[key]
  }
  return result
}

const isPlainObject = (v: any) => typeof v === 'object' && v !== null
const map = new Map()
function deepCopy(v: any) {
  if (!isPlainObject(v)) {
    return v
  }

  const keys = Object.keys(v)
  const result = Array.isArray(v) ? [] : {}
  map.set(v, result)
  for (const key of keys) {
    // result[key] = isPlainObject(v[key]) ? deepCopy(v[key]) : v[key]
    if (isPlainObject(v[key])) {
      let copy = map.get(v[key])
      if (copy) {
        result[key] = copy
      } else {
        copy = deepCopy(v[key])
        map.set(v[key], copy)
        result[key] = copy
      }
    } else {
      result[key] = v[key]
    }
  }
  return result
}

const map2 = new Map()
function deepCopy2(v: any) {
  if (!isPlainObject(v)) {
    return v
  }

  const result = Array.isArray(v) ? [] : {}
  map2.set(v, result)
  const queue: any[][] = [[v, result]]

  while (queue.length) {
    const [origin, target] = queue.shift()
    const keys = Object.keys(origin)
    for (const key of keys) {
      if (!isPlainObject(origin[key])) {
        target[key] = origin[key]
      } else {
        const copy = map2.get(origin[key])
        if (copy) {
          target[key] = copy
        } else {
          target[key] = Array.isArray(origin[key]) ? [] : {}
          queue.push([origin[key], target[key]])
        }
      }
    }
  }

  return result
}

let obj: any
let arr: any
function beforeEach() {
  obj = { a: 'a', b: [1, 2] }
  arr = [1, 2, 3, { a: 'a' }]
}

function test1() {
  beforeEach()
  const shallowObj = shallowCopy(obj)
  const shallowArr = shallowCopy(arr)
  console.log(shallowObj, '--', obj)
  console.log(shallowArr, '--', arr)
  shallowObj.b.push(3)
  console.log(shallowObj, '--', obj)
}

function test2() {
  beforeEach()
  const o1 = { name: 'o1', o: {} }
  const o2 = { name: 'o2', o: o1 }
  o1.o = o2
  // const obj2 = deepCopy(obj)
  // const arr2 = deepCopy(arr)
  // console.log(obj2, '--', obj)
  // console.log(arr2, '--', arr)
  // obj2.b.push(3)
  // console.log(obj2, '--', obj)
  const result = deepCopy2(o1)
  console.log(result)
}

function main() {
  // test1()
  test2()
}
main()
