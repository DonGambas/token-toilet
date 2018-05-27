import React, { Component } from 'react'
import {FormGroup, ControlLabel, FormControl, Button, FieldGroup } from 'react-bootstrap';
import { ContractForm } from 'drizzle-react-components'
import getWeb3 from '../../util/web3/getWeb3'

class ToiletFlusher extends Component {
  constructor(props, context) {
    super(props)
    this.state = {
      showERC20: false,
      showERC721: false,
      showButton: true,
      contractAddress: "contract address",
      quantity: "enter value",
      tokenType: "erc20",
      web3: null
    }
    this.toggleERC20 = this.toggleERC20.bind(this);
    this.toggleERC721 = this.toggleERC721.bind(this);
    this.handleChange = this.handleChange.bind(this);
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

  toggleERC20() {
    this.setState({
      showERC20: !this.state.showERC20,
      showButton: false
    });

  }

  toggleERC721(){
    this.setState({
      showERC721: !this.state.showERC721,
      showButton: false
    });
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    this.setState({[name]: event.target.value});
  }

  handleSubmit(){
    if(this.state.tokenType === "erc20"){
      const contract = new this.state.web3.eth.Contract(/* abi, contract*/);
      contract.methods.approve(/* address, */ this.state.quantity).send({from: this.props.accounts[0]})
        .then(receipt => {

        });

    } else if(this.state.tokenType === "erc721"){
      const contract = new this.state.web3.eth.Contract(/* abi, contract*/);
      contract.methods.approve(/* address,*/ this.state.quantity).send({from: this.props.accounts[0]})
        .then(receipt => {

        });
    }
  }

  render() {
    if(this.state.web3){
    }
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1 style={{textAlign:'center'}}>Dump Some Tokens</h1>
            <p style={{textAlign:'center'}}>ERC-20 or ERC-721</p>
            {this.state.showButton &&
              <div style={{display:'flex', flexDirection:'column', justifyContent: 'center'}}>
              {/*
                <Button onClick={this.toggleERC20}> Flush ERC20 tokens down the toilet </Button>
                <Button onClick={this.toggleERC721} style={{marginTop:'10px'}}> Flush ERC721 tokens down the toilet </Button>
                */}
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
              </div>
            }
            {this.state.showERC20 &&
              <div div style={{display:'flex', flexDirection:'column', justifyContent: 'center'}}>
                <p>flush an erc20</p>
                <ContractForm contract="Toilet" method="transferERC20" labels={['Contract Address', 'Amount to Send']} />
              </div>
            }
            {this.state.showERC721 &&
              <div div style={{display:'flex', flexDirection:'column', justifyContent: 'center'}}>
                <p>flush an erc721</p>
                <ContractForm contract="Toilet" method="transferERC721" labels={['Contract Address', 'Asset Id']} />
              </div>
            }
          </div>
        </div>
      </main>
    )
  }
}

export default ToiletFlusher
