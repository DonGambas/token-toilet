import React, { Component } from 'react'
import {FormGroup, ControlLabel, FormControl, Button, FieldGroup } from 'react-bootstrap';
import getWeb3 from '../../util/web3/getWeb3'
import Toilet from '../../../build/contracts/Toilet.json'




class FountainThrower extends Component {
  constructor(props, context) {
    super(props)
    this.state = {
      quantity: "enter value",
      tokenType: "erc20",
      web3: null,
      step:"start"
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    getWeb3
    .then(results => {
      this.setState({
        web3: results.payload.web3Instance
      })
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }


  handleChange(event) {
    const target = event.target;
    const name = target.name;
    this.setState({[name]: event.target.value});
  }

  handleSubmit(){

    this.setState({step:'loading'});

    setTimeout(() => {
      this.setState({step:'success'});
    }, 500)

    const contract = new this.state.web3.eth.Contract( Toilet.abi, '0x254dffcd3277c0b1660f6d42efbb754edababc2b');
    contract.methods.getLoot().send({from: this.props.accounts[0]})
      .then(receipt => {
        console.log(receipt)
      });
  }

  render() {
    let body;

    if(this.state.step === 'start'){
      body = (
      <div>
        <p>You'll get a surprise ERC-20 or ERC-721 token. It's a magic fountain so you don't know exactly what you'll get </p>
        <Button onClick={this.handleSubmit} style={{marginTop:'10px'}}>Throw 5 DAI</Button>
      </div>

      )
    } else if (this.state.step === "loading"){
      body = (
        <p>Here's your surprise</p>
      )
    } else if (this.state.step === "success"){
      body = (
        <div>
          <p>Here's your surprise</p>
          <p>How about</p>
        </div>
      )
    }

    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1 style={{textAlign:'center'}}>Throw a Coin</h1>
            <p style={{textAlign:'center'}}>The fountain only takes DAI (why?)</p>
              <div style={{display:'flex', flexDirection:'column', justifyContent: 'center'}}>
              {body}
              </div>
          </div>
        </div>
      </main>
    )
  }
}

export default FountainThrower
