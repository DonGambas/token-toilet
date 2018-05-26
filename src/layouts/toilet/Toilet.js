import React, { Component } from 'react'
import {Button } from 'react-bootstrap';


class Toilet extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props
  }

  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Toilet</h1>
            <p>This is the toilet page.</p>
            <Button> Flush your tokens down the toilet </Button>
          </div>
        </div>
      </main>
    )
  }
}

export default Toilet
