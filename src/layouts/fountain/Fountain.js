import React, { Component } from 'react'
import {Button } from 'react-bootstrap';
import { ContractForm } from 'drizzle-react-components'

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
            <h1 style={{textAlign:'center'}}>The Token Fountain</h1>
            <p style={{textAlign:'center'}}>Throw a coin, make a wish!</p>
            <p style={{textAlign:'center'}}>Throw 5 DAI into the Token Fountain and receive surprise tokens in return. Kitties, Dentacoin, or whatever the RNG decides. Who knows what the future holds?</p>
            <ContractForm contract="Toilet" method="getSurprise"/>
          </div>
        </div>
      </main>
    )
  }
}

export default Fountain
