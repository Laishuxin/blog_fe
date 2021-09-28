function hash(args) {
  return JSON.stringify(args)
}
function memoized(fn) {
  const cache = {}
  const memoizedFn = function (...args) {
    const key = hash(args)
    if (cache[key]) {
      return cache[key]
    }

    const promise = fn.apply(this, args).then(
      data => data,
      err => {
        throw err
      },
    )
    cache[key] = promise
    promise.catch(_ => {
      cache[key] = null
    })

    return promise
  }
  return memoizedFn
}

const fetchData = (...args) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('....')
      resolve(JSON.stringify(args))
    }, 1000)
  })
}

function main() {
  const memoizedFn = memoized(fetchData)
  memoizedFn(1, 2)
    .then(data => console.log('data: ', data))
    .catch(e => console.log('error: ', e))
  memoizedFn(1, 2)
    .then(data => console.log('data: ', data))
    .catch(e => console.log('error: ', e))
  memoizedFn(2, 2)
    .then(data => console.log('data: ', data))
    .catch(e => console.log('error: ', e))
  setTimeout(() => {
    memoizedFn(1, 2)
      .then(data => console.log('data: ', data))
      .catch(e => console.log('error: ', e))
  }, 2000)
}
main()
