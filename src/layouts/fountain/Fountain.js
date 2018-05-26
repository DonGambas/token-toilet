import React, { Component } from 'react'
import {Button } from 'react-bootstrap';


class Fountain extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props
  }

  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Magic ERC Fountain</h1>
            <p>This is the fountain page</p>
            <Button> Send 5 dai, make a wish</Button>
          </div>
        </div>
      </main>
    )
  }
}

export default Fountain
