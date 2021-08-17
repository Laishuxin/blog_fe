import React, { Component } from 'react'
import Parent from './Parent'

export default class App extends Component {
  state = {
    isShow: true
  }

  setIsShow = () => {
    this.setState({ isShow: !this.state.isShow })
  }

  render() {
    return (
      <div>
        <button onClick={this.setIsShow}>change show</button>
        {this.state.isShow ? <Parent /> : null}
      </div>
    )
  }
}
