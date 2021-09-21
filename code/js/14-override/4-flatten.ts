export {}

function flatten(arr: any[]) {
  return arr.reduce(
    (prev, curr) => prev.concat(Array.isArray(curr) ? flatten(curr) : curr),
    [],
  )
}

function flatten2(arr: any[]) {
  let result = []
  let queue: any[][] = [arr]
  while (queue.length) {
    const task = queue.shift()
    for (let i = 0; i < task.length; i++) {
      if (Array.isArray(task[i])) {
        queue.push(task[i])
      } else {
        result.push(task[i])
      }
    }
  }

  return result
}

function main() {
  const arr = [1, 2, [3, 4], [5, [6, 7]], [8, [9, 10]]]
  const result = flatten2(arr)
  console.log(result)
}
main()
