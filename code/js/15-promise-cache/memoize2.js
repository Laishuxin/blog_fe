function hash(args) {
  return JSON.stringify(args)
}

function destroyCacheObj(cache, key) {
  if (!cache[key]) {
    return
  }
  clearTimeout(cache[key].expiredId)
  delete cache[key]
}

function memoized(fn, options = {}) {
  /**
   * @type {{[key in string]: {result: any, expireId: number | null}}}
   */
  const cache = {}
  const { maxAge = 0 } = options

  const memoizedFn = function (...args) {
    const key = hash(args)
    if (cache[key]) {
      return cache[key].result
    }

    const promise = fn.apply(this, args).then(
      data => data,
      err => {
        throw err
      },
    )

    const expireId = maxAge
      ? setTimeout(destroyCacheObj, maxAge, cache, key)
      : null
    cache[key] = {
      result: promise,
      expireId,
    }
    promise.catch(_ => {
      destroyCacheObj(cache, key)
    })

    return promise
  }

  memoizedFn.clear = function () {
    const keys = Object.keys(cache)
    keys.forEach(key => destroyCacheObj(cache, key))
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
  const memoizedFn = memoized(fetchData, { maxAge: 100 })
  memoizedFn(1, 2)
    .then(data => console.log('data: ', data))
    .catch(e => console.log('error: ', e))
  memoizedFn(1, 2)
    .then(data => console.log('data: ', data))
    .catch(e => console.log('error: ', e))
  // memoizedFn(2, 2)
  //   .then(data => console.log('data: ', data))
  //   .catch(e => console.log('error: ', e))
  setTimeout(() => {
    memoizedFn(1, 2)
      .then(data => console.log('data: ', data))
      .catch(e => console.log('error: ', e))
  }, 2000)
}
main()
