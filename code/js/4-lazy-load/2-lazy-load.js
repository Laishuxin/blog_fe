const data = [
  { src: 'images/1.png', name: 'pic1' },
  { src: 'images/2.png', name: 'pic2' },
  { src: 'images/3.png', name: 'pic3' },
  { src: 'images/4.png', name: 'pic4' },
  { src: 'images/5.png', name: 'pic5' },
  { src: 'images/6.png', name: 'pic6' },
  { src: 'images/7.png', name: 'pic7' },
  { src: 'images/8.png', name: 'pic8' },
]

const template = document.getElementsByTagName('template')[0].innerHTML
const container = document.querySelector('.img-list')
const imgListStr = render(data, template)
container.innerHTML = imgListStr

bindEvent()
backToTop()

function render(data, template) {
  let imgStr
  const imgStrArr = []
  data.forEach(item => {
    imgStr = template.replace(/{{(.*?)}}/g, function (_, key) {
      return {
        src: item['src'],
        name: item['name'],
      }[key]
    })
    imgStrArr.push(imgStr)
  })
  return imgStrArr.join('')
}

function bindEvent() {
  const images = document.querySelectorAll('.img-item img')

  // window.onload = window.onscroll = throttle(lazyLoad(images));
  window.onload = window.onscroll = lazyLoad(images)
}

function loadImage(img) {
  if (!img || !img instanceof HTMLImageElement)
    throw new TypeError(`${img} is not a HTMLImageElement`)
  img.src = img.getAttribute('data-src') || ''
  img.removeAttribute('data-src')
}

function throttle(
  fn,
  wait = 300,
  options = {
    leading: true,
    tailing: true,
  },
) {
  const { leading, tailing } = options
  let prev = 0
  let timeout = null
  function clear() {
    if (timeout) {
      clearTimeout(timeout)
      timeout = null
    }
  }

  return function () {
    // debugger
    let now = +new Date()
    let result
    const remaining = wait - (now - prev)
    if ((leading && remaining < 0) || remaining > wait) {
      clear()
      prev = now
      result = fn.apply(this, arguments)
    } else if (tailing && timeout === null) {
      timeout = setTimeout(() => {
        result = fn.apply(this, arguments)
        timeout = null
        prev = +new Date()
      }, remaining)
    }

    return result
  }
}

function lazyLoad(images) {
  const length = images.length
  const doc = document
  let n = 0

  return function () {
    const cHeight = doc.documentElement.clientHeight
    const scrollTop = doc.documentElement.scrollTop || doc.body.scrollTop
    let img
    for (let i = n; i < length; i++) {
      img = images[i]
      if (img.offsetTop < cHeight + scrollTop) {
        loadImage(img)
        ++n
      }
    }
  }
}

function backToTop() {
  setTimeout(() => {
    window.scrollTo(0, 0)
  }, 150)
}
