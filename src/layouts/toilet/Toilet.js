import React, { Component } from 'react'
import {Link} from 'react-router'
import { MainContainer, BlueContainer, BrownContainer, RegularText, TTButton, Title, LandingImage, RightArrow} from '../../styles'


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
        <BlueContainer>
          <Title style={{textAlign:'center', marginBottom: '10px'}}>The Token Toilet</Title>
          <RegularText style={{textAlign:'center'}}>A hygienic solution for fecal tokens</RegularText>
          {/* <img src="/assets/images/fountain-only.svg"  style={{position:'absolute', bottom: '0'}}></img> */}
        </BlueContainer>
        <div style={{flex:'2'}}></div>
        <div style={{overflowX:'hidden'}}>
          <LandingImage src="/assets/images/toilet.svg"></LandingImage>
        </div>
        <BrownContainer>
            <RegularText style={{textAlign:'center'}}> Pesky airdrops taking over your wallet? Is that DAO token balance still triggering your PTSD?  We have the solution!</RegularText>
            {/* <ContractForm contract="Toilet" method="getSurprise"/> */}
            <TTButton><Link to="/toiletflusher" style={{display: 'block', height: '100%', textDecoration:'none', color: 'black'}}> Dump Some Tokens</Link></TTButton>
            <Link to="/sprinkler"><RegularText style={{ textAlign: 'center', color: 'white', textDecoration: 'underline'}}>Wait, what?</RegularText></Link>
        </BrownContainer>
        <RightArrow><Title style={{transform: 'rotate(225deg)', fontSize:'66px'}}><Link to="/fountain">&#8990;</Link></Title></RightArrow>
      </MainContainer>
    )
  }
}

export default Toilet
