const data = [
  { src: 'images/1.png', name: 'pic1' },
  { src: 'images/2.png', name: 'pic2' },
  { src: 'images/3.png', name: 'pic3' },
  { src: 'images/4.png', name: 'pic4' },
  { src: 'images/5.png', name: 'pic5' },
  { src: 'images/6.png', name: 'pic6' },
  { src: 'images/7.png', name: 'pic7' },
  { src: 'images/8.png', name: 'pic8' }
]

const template = document.getElementsByTagName('template')[0].innerHTML
const container = document.querySelector('.img-list')
const imgListStr = render(data, template)
container.innerHTML = imgListStr
const images = container.querySelectorAll('img')

let count = 0
const length = images.length
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const target = entry.target
    if (entry.intersectionRatio > 0) {
      target.src = target.getAttribute('data-src')
      target.removeAttribute('data-src')
      io.unobserve(target)
      if (++count === length) {
        io.disconnect()
      }
    }
  })
})

images.forEach((item) => {
  io.observe(item)
})

function render(data, template) {
  let imgStr
  const imgStrArr = []
  data.forEach((item) => {
    imgStr = template.replace(/{{(.*?)}}/g, function (_, key) {
      return {
        src: item['src'],
        name: item['name']
      }[key]
    })
    imgStrArr.push(imgStr)
  })
  return imgStrArr.join('')
}
