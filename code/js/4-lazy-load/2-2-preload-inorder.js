const container = document.querySelector('.container')
const data = [
  { src: 'images/1.png', name: 'pic1' },
  { src: 'images/2.png', name: 'pic2' },
  { src: 'images/3.png', name: 'pic3' },
  { src: 'images/4.png', name: 'pic4' },
  { src: 'images/5.png', name: 'pic5' },
  { src: '', name: 'pic6' },
  { src: 'images/6.png', name: 'pic6' },
  { src: 'images/7.png', name: 'pic7' },
  { src: 'images/8.png', name: 'pic8' },
]

const length = data.length
const imgPromiseList = loadImages(data.map(item => item.src))
const images = ensureOrder(imgPromiseList)
  .then(images =>
    addChildren(
      images.filter(item => item !== null),
      container,
    ),
  )
  .catch(e => console.log(e))

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const time = Math.random() * 1000
    const img = new Image()
    if (!src) reject('invalid src')
    img.src = src
    img.onload = () => {
      setTimeout(() => resolve(img), time)
    }
    img.onerror = reject
  })
}

function loadImages(imgUrlList) {
  return imgUrlList.map(item => {
    return loadImage(item)
  })
}

function addChildren(children, parent) {
  try {
    parent.append(...children)
  } catch (_) {}
}

function ensureOrder(promises) {
  return new Promise(resolve => {
    const length = promises.length
    let count = 0
    const list = Array(length)
    promises.forEach((promise, index) => {
      // debugger
      promise
        .then(value => {
          console.log(count, value)
          list[index] = value
          ++count === length && resolve(list)
        })
        .catch(_ => {
          list[index] = null
          ++count === length && resolve(list)
        })
    })
  })
}
