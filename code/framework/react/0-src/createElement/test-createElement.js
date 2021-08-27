import { createElement } from './createElement.js'
function test1() {
  const h1 = createElement('h1', {
    style: { color: 'white', background: 'back' },
    id: 'title',
  })
  const span = createElement('span', { id: 'content' }, 'hello react')
  const container = createElement('div', { className: 'container' }, h1, span)
  console.log(container)
}

test1()
