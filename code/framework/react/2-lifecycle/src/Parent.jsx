import React, { Component } from 'react'
import Child from './Child'

export default class Parent extends Component {
  constructor(props) {
    super(props)
    console.log('parent: constructor')
  }

  state = {
    count: 0
  }

  setCount = () => {
    this.setState({ count: this.state.count + 1 })
  }

  componentDidMount() {
    console.log('parent: did mount')
  }

  componentDidUpdate() {
    console.log('parent: did update')
  }

  componentWillUnmount() {
    console.log('parent: will Unmount')
  }

  render() {
    console.log('parent: render')
    return (
      <div>
        <h1>parent</h1>
        <p>parent counter: {this.state.count}</p>
        <button onClick={this.setCount}>parent: +</button>
        <hr />
        <Child />
      </div>
    )
  }
}
