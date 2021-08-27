export {}
function remove<T = any>(arr: T[], item: T): T[] | void {
  if (arr.length) {
    const index = arr.indexOf(item)
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

function main() {
  const arr = ['aaa', 'bbb', 'ccc']
  const result = remove(arr, 'bbb')
  console.log('result = ', result)
  console.log('arr = ', arr)
}

main()
