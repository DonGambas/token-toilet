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
            <h1>Toilet</h1>
            <p>This is the toilet page.</p>
            {this.state.showButton &&
              <div>
                <Button onClick={this.toggleERC20}> Flush ERC20 tokens down the toilet </Button>
                <Button onClick={this.toggleERC721}> Flush ERC721 tokens down the toilet </Button>
              </div>
            }
            {this.state.showERC20 &&
              <div>
                <p>send an erc20</p>
                <ContractForm contract="Toilet" method="transferERC20" labels={['Contract Address', 'Amount to Send']} />
              </div>
            }
            {this.state.showERC721 &&
              <div>
                <p>send an erc721</p>
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
