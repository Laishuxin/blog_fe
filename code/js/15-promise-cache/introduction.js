function getUserById(id) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(`solve id: ${id}`)
      return resolve({ id, name: 'foo' })
    }, 1000)
  })
}

function main() {
  getUserById(1).then(user => console.log(user))
  getUserById(1).then(user => console.log(user))
}
main()

function memoized(fn) {
  const cache = {}
  return function (...args) {
    const key = JSON.stringify(args)
    return cache[key] || (cache[key] = fn.apply(this, args))
  }
}
