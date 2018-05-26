import React, { Component } from 'react'
import {FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import { ContractForm } from 'drizzle-react-components'

class Toilet extends Component {
  constructor(props, context) {
    super(props)
    this.state = {
      showERC20: false,
      showERC721: false,
      showButton: true,
      contractAddress: "contract address",
      quantity: "quantity",
      tokenId: "asset id"
    }
    this.toggleERC20 = this.toggleERC20.bind(this);
    this.toggleERC721 = this.toggleERC721.bind(this);
    this.handleChange = this.handleChange.bind(this);
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

  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1 style={{textAlign:'center'}}>The Token Toilet</h1>
            <p style={{textAlign:'center'}}>A hygienic solution for fecal tokens</p>
            <p style={{textAlign:'center'}}> Pesky airdrops taking over your wallet? Your CryptoKitty won't purr? Is that DAO token balance still triggering your PTSD?  We have the solution!</p>
            {this.state.showButton &&
              <div style={{display:'flex', flexDirection:'column', justifyContent: 'center'}}>
                <Button onClick={this.toggleERC20}> Flush ERC20 tokens down the toilet </Button>
                <Button onClick={this.toggleERC721} style={{marginTop:'10px'}}> Flush ERC721 tokens down the toilet </Button>
                <FormGroup controlId="formControlsSelect">
                <FormControl componentClass="select" placeholder="select" onChange={this.handleChange} name="tokeType">
                  <option value="select">token type</option>
                  <option value="erc20">ERC20</option>
                  <option value="erc721">ERC721</option>
                </FormControl>
              </FormGroup>
              <FormGroup controlId="formControlsSelect">
              <FormControl componentClass="select" placeholder="select" onChange={this.handleChange} name="tokenName">
                <option value="select">select token</option>
                <option value="erc20">alkj</option>
                <option value="erc721">adfadf</option>
              </FormControl>
            </FormGroup>
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

export default Toilet
