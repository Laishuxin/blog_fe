import React, { Component } from 'react'

export default class Counter1 extends Component {
  constructor(props) {
    super(props)
    console.log('counter1: constructing...')
    this.state = {
      count: 0
    }
  }

  setCount = () => {
    this.setState({ count: this.state.count + 1 })
  }

  componentDidMount() {
    console.log('counter1: did mounted...')
  }
  
  componentDidUpdate() {
    console.log('counter1: did updated')
  }

  componentWillUnmount() {
    console.log('counter1: will unmount')
  }
  
  render() {
    console.log('counter1: rendering...')
    return (
      <div>
        <p>counter1 当前技术为：{this.state.count}</p>
        <button onClick={this.setCount}>+</button>
      </div>
    )
  }
}
