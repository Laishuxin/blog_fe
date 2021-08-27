import React, { Component, PureComponent } from 'react'

export default class Child extends PureComponent {
  constructor(props) {
    super(props)
    console.log('child: constructor')
  }

  state = {
    count: 0,
  }

  setCount = () => {
    this.setState({ count: this.state.count + 2 })
  }

  componentDidMount() {
    console.log('child: did mount')
  }

  componentDidUpdate() {
    console.log('child: did update')
  }

  componentWillUnmount() {
    console.log('child: will Unmount')
  }

  render() {
    console.log('child: render')
    return (
      <div>
        <h1>child</h1>
        <p>child counter: {this.state.count}</p>
        <button onClick={this.setCount}>child: +</button>
      </div>
    )
  }
}
