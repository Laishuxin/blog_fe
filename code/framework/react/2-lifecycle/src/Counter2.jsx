import React, { Component } from 'react'

export default class Counter2 extends Component {
  constructor(props) {
    super(props)
    console.log('counter2: constructing...')
    this.state = {
      count: 0
    }
  }

  setCount = () => {
    this.setState({ count: this.state.count + 1 })
  }

  componentDidMount() {
    console.log('counter2: did mounted...')
  }

  componentDidUpdate() {
    console.log('counter2: did updated')
  }

  componentWillUnmount() {
    console.log('counter2: will unmount')
  }

  render() {
    console.log('counter2: rendering...')
    return (
      <div>
        <p>counter2 当前技术为：{this.state.count}</p>
        <button onClick={this.setCount}>+</button>
      </div>
    )
  }
}
