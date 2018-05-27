import React, { Component } from 'react'
import {Link} from 'react-router'
import { Button } from 'react-bootstrap';
import { MainContainer, BlueContainer, BrownContainer} from '../../styles'


class Toilet extends Component {
  constructor(props, context) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(){
    //check account DAI balanceOf if 5 or greater call method on contract, return new asset to user
  }

  render() {
    return(
      <MainContainer>
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1 style={{textAlign:'center'}}>The Token Toilet</h1>
            <p style={{textAlign:'center'}}>A hygienic solution for fecal tokens</p>
            <p style={{textAlign:'center'}}> Pesky airdrops taking over your wallet? Your CryptoKitty won't purr? Is that DAO token balance still triggering your PTSD?  We have the solution!</p>
            <Link to="/toiletflusher">Dump Some Tokens</Link>
          </div>
        </div>
      </MainContainer>
    )
  }
}

export default Toilet
