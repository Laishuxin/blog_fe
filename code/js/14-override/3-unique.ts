export {}
const unique = (arr: any[]) => Array.from(new Set(arr))
const unique2 = (arr: any[]) =>
  arr.filter((item, index) => {
    for (var i = index + 1; i < arr.length; i++) {
      if (item === arr[i]) {
        return false
      }
    }
    return true
  })

function test() {
  const arr = [1, 2, 3]
  const result = unique2([1, 2, 2, 3, 4, arr, [1, 2, 3], arr])
  console.log(result)
}

function main() {
  test()
}
main()
