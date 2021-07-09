import { isInVisibleArea } from './1-isInVisibleArea.js'
const win = window
const doc = document

let list = doc.getElementsByTagName('li')
list = Array.from(list)
list.forEach((li) => {
  if (isInVisibleArea(li, doc.documentElement || doc.body)) {
    const innerHTML = li.innerHTML
    console.log(innerHTML)
  } else {
  }
})
