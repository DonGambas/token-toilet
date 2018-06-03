import React, { Component } from 'react'
import getWeb3 from '../../util/web3/getWeb3Instance'
import {Link} from 'react-router'
import Toilet from '../../../build/contracts/Toilet.json'
import { BrownContainer, Title, RegularText, TTButton, FlexColumnContainer, Shaker } from '../../styles';




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
        web3: results.web3Instance
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
        <RegularText>Great! Your browser is <Link href="https://www.reddit.com/r/ethereum/comments/87wx66/growing_list_of_web3_mobile_browsers/">Web3</Link> enabled and you have DAI in your wallet.</RegularText>
        <img alt='box' src="/assets/images/box.svg"  style={{height: '30vh'}}></img>
        <RegularText>You'll get a surprise ERC-20 or ERC-721 token. It's a magic fountain! </RegularText>
        <FlexColumnContainer>
          <RegularText>All proceeds <Link href="https://giveth.io/">go to charity</Link></RegularText>
          <TTButton onClick={this.handleSubmit} style={{marginTop:'10px'}}>Throw 5 DAI</TTButton>
          {/* <RegularText><Link>or throw directly from your wallet</Link></RegularText> */}
        </FlexColumnContainer>
      </FlexColumnContainer>

      )
    } else if (this.state.step === "loading"){
      body = (
        <FlexColumnContainer>
          <Title style={{textAlign:'center', fontFamily: 'sans-serif', margin: '20px', fontSize: '36px'}}>Here's your surprise!</Title>
          <Shaker><img alt='box' src="/assets/images/box.svg"  style={{height: '30vh'}}></img></Shaker>
        </FlexColumnContainer>
      )
    } else if (this.state.step === "success"){
      body = (
        <FlexColumnContainer style={{ justifyContent:'space-between', height:'100%'}}>
          <Title style={{textAlign:'center', fontFamily: 'sans-serif', margin: '20px', fontSize: '36px'}}>Here's your surprise!</Title>
          <img alt='kitty' src="/assets/images/kitty-eth.svg"  style={{height: '25vh'}}></img>
          <Regular-Text style={{fontSize: '24px'}}><b>Cryptokitty #452252!</b></Regular-Text>
          <div>
            <RegularText style={{marginBottom: '0px'}}>How about:</RegularText>
            <ul>
              <li style={{marginBottom: '0px'}}><RegularText><span style={{margin: '0 5px'}}>-</span> <Link to="/fountain">Throwing some more coins</Link></RegularText></li>
              <li style={{marginBottom: '0px'}}><RegularText><span style={{margin: '0 5px'}}>-</span> Flush spoiled tokens in the <Link to="/toilet">Toilet</Link></RegularText></li>
              <li style={{marginBottom: '0px'}}><RegularText><span style={{margin: '0 5px'}}>-</span> <Link to="/sprinkler">Learning more about this project</Link></RegularText></li>
            </ul>
          </div>
        </FlexColumnContainer>
      )
    }

    return(
      <main style={{display: 'flex', flexDirection: 'column', height: '100vh'}} className="main-container">
        <BrownContainer style={{flex:'1', justifyContent: 'space-evenly'}}>
          <Title style={{textAlign:'center'}}>Throw a Coin</Title>
          <RegularText style={{textAlign:'center'}}>The fountain only takes DAI (<Link style={{color:'white', textDecoration: 'underline'}} to="/sprinkler">why?</Link>)</RegularText>
        </BrownContainer>
        <FlexColumnContainer style={{flex:'4', padding: '20px'}}>
          {body}
        </FlexColumnContainer>
      </main>
    )
  }
}

export default FountainThrower
