const container = document.querySelector('.container')
const data = [
  { src: 'images/1.png', name: 'pic1' },
  { src: 'images/2.png', name: 'pic2' },
  { src: 'images/3.png', name: 'pic3' },
  { src: 'images/4.png', name: 'pic4' },
  { src: 'images/5.png', name: 'pic5' },
  { src: '', name: 'pic6' }, // 测试异常图片
  { src: 'images/6.png', name: 'pic6' },
  { src: 'images/7.png', name: 'pic7' },
  { src: 'images/8.png', name: 'pic8' },
]

const length = data.length
const imgList = mapImage(data.map(item => item.src)).then(imageList =>
  addChildren(imageList, container),
)

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const time = Math.random() * 1000
    const img = new Image()
    img.src = src
    img.onload = () => resolve(img)
    img.onload = () => {
      setTimeout(() => resolve(img), time)
    }
    img.onerror = reject
  })
}

function mapImage(images) {
  return new Promise(resolve => {
    const list = []
    const length = images.length
    let count = 0
    for (let i = 0; i < length; i++) {
      const image = images[i]
      loadImage(image)
        .then(img => {
          list.push(img)
          count++
          if (count === length) resolve(list)
        })
        .catch(_ => {
          count++
          if (count === length) resolve(list)
        })
    }
  })
}

function addChildren(children, parent) {
  try {
    parent.append(...children)
  } catch (_) {}
}
