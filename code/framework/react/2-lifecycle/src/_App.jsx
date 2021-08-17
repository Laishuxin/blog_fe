import React, { Component } from 'react'
import Counter1 from './Counter1'
import Counter2 from './Counter2'

export default class App extends Component {
  state = {
    counterId: 1
  }

  setCounterId = (id) => {
    this.setState({ counterId: id })
  }
  render() {
    const showCounter1 = this.state.counterId === 1
    return (
      <div>
        <div className="btns">
          <button onClick={() => this.setCounterId(1)}>counter1</button>
          <button onClick={() => this.setCounterId(2)}>counter2</button>
        </div>
        <div className="counter">
          { showCounter1 ? <Counter1 /> : <Counter2 />}
        </div>
      </div>
    )
  }
}
