import React, { Component } from 'react'
import { Button } from 'react-bootstrap';
import getWeb3 from '../../util/web3/getWeb3'
import Toilet from '../../../build/contracts/Toilet.json'
import { BrownContainer, Title, RegularText, TTButton, FlexColumnContainer, Link, Shaker } from '../../styles';




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
    }, 3000)

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
      <FlexColumnContainer style={{textAlign:'center', justifyContent:'space-around', height:'100%'}}>
        <RegularText>Great! Your browser is web3 enabled and you have DAI in your wallet.</RegularText>
        <img src="/assets/images/box.svg"  style={{height: '30vh'}}></img>
        <RegularText>You'll get a surprise ERC-20 or ERC-721 token. It's a magic fountain so you don't know exactly what you'll get </RegularText>
        <FlexColumnContainer>
          <RegularText>All proceeds <Link>go to charity</Link></RegularText>
          <TTButton onClick={this.handleSubmit} style={{marginTop:'10px'}}>Throw 5 DAI</TTButton>
          <RegularText><Link>or throw directly from your wallet</Link></RegularText>
        </FlexColumnContainer>
      </FlexColumnContainer>

      )
    } else if (this.state.step === "loading"){
      body = (
        <FlexColumnContainer>
          <Title style={{textAlign:'center'}}>Here's your surprise!</Title>
          <Shaker><img src="/assets/images/box.svg"  style={{height: '30vh'}}></img></Shaker>
        </FlexColumnContainer>
      )
    } else if (this.state.step === "success"){
      body = (
        <FlexColumnContainer>
          <Title style={{textAlign:'center'}}>Here's your surprise!</Title>
          <img src="/assets/images/toilet-paper.png"  style={{height: '10vh'}}></img>
          <Regular-Text><b>Thanks for Flushing!</b></Regular-Text>
          <div>
            <RegularText style={{marginBottom: '0px'}}>How about:</RegularText>
            <ul>
              <li style={{marginBottom: '0px'}}><RegularText><span style={{margin: '0 5px'}}>-</span> <Link>Throwing some more coins</Link></RegularText></li>
              <li style={{marginBottom: '0px'}}><RegularText><span style={{margin: '0 5px'}}>-</span> Flushing some spoiled tokens in the <Link>Token Toilet</Link></RegularText></li>
              <li style={{marginBottom: '0px'}}><RegularText><span style={{margin: '0 5px'}}>-</span> <Link>Learning more about this project</Link></RegularText></li>
            </ul>
          </div>
        </FlexColumnContainer>
      )
    }

    return(
      <main style={{display: 'flex', flexDirection: 'column', height: '100vh'}} className="main-container">
        <BrownContainer style={{flex:'1'}}>
          <Title style={{textAlign:'center'}}>Throw a Coin</Title>
          <RegularText style={{textAlign:'center'}}>The fountain only takes DAI (why?)</RegularText>
        </BrownContainer>
        <FlexColumnContainer style={{flex:'4', padding: '20px'}}>
          {body}
        </FlexColumnContainer>
      </main>
    )
  }
}

export default FountainThrower
