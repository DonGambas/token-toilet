import React, { Component } from 'react';
import {
  MainContainer,
  BlueContainer,
  BrownContainer,
  RegularText,
  TTButton,
  Title,
  LandingImage,
  LeftArrow
} from '../../styles';
import {Link} from 'react-router';

class Sprinkler extends Component {
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
        <BlueContainer>
          <Title style={{textAlign:'center'}}>The DAI Sprinkler</Title>
          <RegularText style={{textAlign:'center'}}>Stable crypto for worthy causes </RegularText>
          {/* <img src="/assets/images/fountain-only.svg"  style={{position:'absolute', bottom: '0'}}></img> */}
        </BlueContainer>
        <div style={{flex:'2'}}></div>
        <div style={{overflowX:'hidden'}}>
          <LandingImage src="/assets/images/sprinkler.svg"></LandingImage>
        </div>
        <BrownContainer>
            <RegularText style={{textAlign:'center'}}> DAI thrown into the <Link style={{color: 'white', textDecoration:'underline'}} to="/fountain">Token Fountain</Link> is donated to <Link style={{color: 'white', textDecoration:'underline'}} href="https://giveth.io/">Giveth.</Link> You can help too by dumping tokens you don't want in the <Link style={{color: 'white', textDecoration:'underline'}} to="toilet">Token Toilet.</Link></RegularText>
            {/* <ContractForm contract="Toilet" method="getSurprise"/> */}
            <TTButton><Link to="/toiletflusher" style={{display: 'block', height: '100%', textDecoration:'none', color: 'black'}}>Learn More</Link></TTButton>
        </BrownContainer>
        <LeftArrow><Title style={{transform: 'rotate(225deg)', fontSize:'66px'}}><Link to="/fountain">&#8989;</Link></Title></LeftArrow>
      </MainContainer>
    )
  }
}

export default Sprinkler
