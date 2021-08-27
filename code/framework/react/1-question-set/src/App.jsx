import React, { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return <div className='app'>{count}</div>
}

const vDOM = React.createElement(
  'h1',
  { id: 'title', style: { color: 'white', background: 'back' } },
  React.createElement('span', null, 'hello react'),
)
console.log('vDOM: ', vDOM)

export default App
