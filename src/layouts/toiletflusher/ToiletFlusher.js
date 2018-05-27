import React, { Component } from 'react'
import {FormGroup, ControlLabel, FormControl, Button, FieldGroup } from 'react-bootstrap';
import { ContractForm } from 'drizzle-react-components'
import getWeb3 from '../../util/web3/getWeb3'
import ERC721 from '../../../build/contracts/ERC721Basic.json'
import ERC20 from '../../../build/contracts/ERC20Basic.json'
import { MainContainer, BrownContainer, Title, RegularText, TTButton, FlexColumnContainer, Link } from '../../styles';


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

    /*if(this.state.tokenType === "erc20"){
      const contract = new this.state.web3.eth.Contract( ERC20.abi, contract);
      contract.methods.approve( address,this.state.quantity).send({from: this.props.accounts[0]})
        .then(receipt => {

        });

    } else if(this.state.tokenType === "erc721"){
      const contract = new this.state.web3.eth.Contract( ERC721.abi, contract);
      contract.methods.approve(address, this.state.quantity).send({from: this.props.accounts[0]})
        .then(receipt => {

        });
    }*/
  }

  render() {
    let body;

    if(this.state.step === 'start'){
      body = (
        <form style={{height:'100%', margin: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly'}}>
        <RegularText style={{textAlign:'center'}}>Great! Your browser is Web3 enabled. What are you dumping?</RegularText>
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
        <TTButton onClick={this.handleSubmit} style={{marginTop:'10px', alignSelf: 'center'}}> Flush That Sh*t</TTButton>
        <RegularText style={{marginTop:'10px', alignSelf: 'center'}}><Link>or throw directly from your wallet</Link></RegularText>

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
      <MainContainer>
        <BrownContainer style={{flex:'1'}}>
          <Title style={{textAlign:'center'}}>Dump Some Tokens</Title>
          <RegularText style={{textAlign:'center'}}>ERC-20 or ERC-721</RegularText>
        </BrownContainer>
        <FlexColumnContainer style={{flex:'4', padding: '20px', width:'100%'}}>
          {body}
        </FlexColumnContainer>
      </MainContainer>
    )
  }
}

export default ToiletFlusher
