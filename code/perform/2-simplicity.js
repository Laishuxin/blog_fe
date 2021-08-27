function method1() {
  let x = 'abc'

  // longhand
  if (x === 'abc' || x === 'edf' || x === 'gh') {
    console.log('statements...')
  }

  // shorthand
  if (['abc', 'edf', 'gh'].includes(x)) {
    console.log('statements...')
  }
}

method1()

function method2() {
  let x = ''
  let y = ''
  // longhand
  if (x !== null || x !== undefined || x !== '') {
    y = x
  }
  console.log('y = ', y)

  // shorthand
  y = x || ''
  console.log('y = ', y)
}

method2()

function method3() {
  let x = ''
  let defaultVal = 'default'
  x = x || defaultVal
  console.log('x = ', x)
}

method3()

function method4() {
  let x = null
  let defaultVal = 'default'
  x = x ?? defaultVal
  console.log('x = ', x) // x = default;
  x = ''
  x = x ?? defaultVal
  console.log('x = ', x) // x =
}

method4()

function method5() {
  // 多变量赋值
  let x1 = 1
  let y1 = '2'
  let z1 = 3
  console.log(x1, y1, z1)

  let [x2, y2, z2] = [1, '2', 3]
  console.log(x2, y2, z2)
}

method5()

function method6() {
  console.log('----------')
  // switch 简化.
  let x = 'x1'
  function case1() {
    console.log('case1: x = ', x)
  }
  function case2() {
    console.log('case2: x = ', x)
  }
  function case3() {
    console.log('case3: x = ', x)
  }
  // longhand
  switch (x) {
    case 'x1':
      case1()
      break
    case 'x2':
      case2()
      break
    default:
      case3()
  }

  // shorthand
  let branches = {
    x1: case1,
    x2: case2,
    default: case3,
  }
  ;(branches[x] || branches['default'])()
}

method6()

function method7() {
  // 数组展开。
  let x = [1, 2, 3],
    y = [4, 5, 6]

  // longhand
  let merge1 = x.concat(y)
  console.log(merge1)

  // shorthand (may be....)
  let merge2 = [...x, ...y]
  console.log(merge2)
}

method7()

function method8() {
  // 拷贝.
  let x = [1, 2, 3]
  // longhand
  let clone1 = x.slice()

  // shorthand
  let clone2 = [...x]
}

method8()

function method9() {}

method9()

function method10() {
  // 对象解构
  let x = {
    field1: 'field1',
    field2: 'field2',
    field3: 'field3',
  }

  let { field1, field2, defaultVal = 'default' } = x
  console.log(field1, field2, defaultVal)
}

method10()

function method11() {
  let x = [
    { name: 'name1', data: 'data1' },
    { name: 'name2', data: 'data2' },
    { name: 'name3', data: 'data3' },
  ]
  let result
  // longhand
  for (let entry of x) {
    if (entry.name === 'name2') {
      result = entry
    }
  }
  console.log('result = ', result)

  // shorthand
  result = null
  result = x.find(item => item.name === 'name2')
  console.log('result = ', result)
}

method11()

function method12() {
  let x = {
    field1: 'field1',
    field2: 'field2',
    field3: 'field3',
  }

  for (const [key, value] of Object.entries(x)) {
    console.log('key = ', key, ', value = ', value)
  }

  for (const key of Object.keys(x)) {
    const value = x[key]
    console.log('key = ', key, ', value = ', value)
  }
}

method12()
