import React, { Component } from 'react'
import {FormGroup, ControlLabel, FormControl, Button, FieldGroup } from 'react-bootstrap';
import { ContractForm } from 'drizzle-react-components'
import getWeb3 from '../../util/web3/getWeb3'

class ToiletFlusher extends Component {
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
        web3: results.web3
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

    /*if(this.state.tokenType === "erc20"){
      const contract = new this.state.web3.eth.Contract( abi, contract);
      contract.methods.approve( address,this.state.quantity).send({from: this.props.accounts[0]})
        .then(receipt => {

        });

    } else if(this.state.tokenType === "erc721"){
      const contract = new this.state.web3.eth.Contract( abi, contract);
      contract.methods.approve(address, this.state.quantity).send({from: this.props.accounts[0]})
        .then(receipt => {

        });
    }*/
  }

  render() {
    let body;

    if(this.state.step === 'start'){
      body = (
        <form>
          <FormGroup>
          <ControlLabel>Token Type</ControlLabel>
          <FormControl componentClass="select" placeholder="select" onChange={this.handleChange} name="tokenType" label="token type">
            <option value="erc20">ERC20</option>
            <option value="erc721">ERC721</option>
          </FormControl>
        </FormGroup>
        <FormGroup>
        <ControlLabel>Token</ControlLabel>
          <FormControl componentClass="select" placeholder="select" onChange={this.handleChange} name="tokenName" label="token">
            <option value="select">select token</option>
            <option value="erc20">alkj</option>
            <option value="erc721">adfadf</option>
          </FormControl>
        </FormGroup>
        <FormGroup>
          {this.state.tokenType === "erc20" ? <ControlLabel>Quantity</ControlLabel> : <ControlLabel>Asset Id</ControlLabel>}
          <FormControl
            type="text"
            name="quantity"
            value={this.state.quantity}
            placeholder="Enter text"
            onChange={this.handleChange}
          />
        </FormGroup>
        <Button onClick={this.handleSubmit} style={{marginTop:'10px'}}> Flush That Sh*t</Button>
      </form>
      )
    } else if (this.state.step === "loading"){
      body = (
        <p>submitted token</p>
      )
    } else if (this.state.step === "success"){
      body = (
        <p>Thanks for Flushing</p>
      )
    }

    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1 style={{textAlign:'center'}}>Dump Some Tokens</h1>
            <p style={{textAlign:'center'}}>ERC-20 or ERC-721</p>
              <div style={{display:'flex', flexDirection:'column', justifyContent: 'center'}}>
              {body}
              </div>
          </div>
        </div>
      </main>
    )
  }
}

export default ToiletFlusher
