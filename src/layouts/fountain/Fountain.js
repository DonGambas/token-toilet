import React, { Component } from 'react'
import {Button } from 'react-bootstrap';
import { ContractForm } from 'drizzle-react-components'
import {Link} from 'react-router'
import styled from "styled-components";
import { MainContainer, BlueContainer, BrownContainer, Title, RegularText, TTButton, LandingImage, LeftArrow, RightArrow} from '../../styles'


class Fountain extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props
  }

  render() {
    return(
      <main style={{display: 'flex', flexDirection: 'column', height: '100vh'}} className="main-container">
        <BlueContainer>
          <Title style={{textAlign:'center'}}>The Token Fountain</Title>
          <RegularText style={{textAlign:'center'}}>Throw a coin, make a wish!</RegularText>
          {/* <img src="/assets/images/fountain-only.svg"  style={{position:'absolute', bottom: '0'}}></img> */}
        </BlueContainer>
        <div style={{flex:'2'}}></div>
        <div style={{overflowX:'hidden'}}>
          <LandingImage src="/assets/images/fountain.svg"></LandingImage>
        </div>
        <BrownContainer>
            <RegularText style={{textAlign:'center'}}>Throw 5 DAI into the Token Fountain and receive surprise tokens in return. Kitties, Dentacoin, <b>who knows?</b></RegularText>
            {/* <ContractForm contract="Toilet" method="getSurprise"/> */}
            <TTButton><Link to="/fountainthrower" style={{display: 'block', height: '100%', textDecoration:'none', color: 'black'}}>Throw a coin</Link></TTButton>
            <Link to="/sprinkler"><RegularText style={{ textAlign: 'center', color: 'white', textDecoration: 'underline'}}>Wait, what?</RegularText></Link>
            <LeftArrow><Title style={{transform: 'rotate(225deg)', fontSize:'66px'}}><Link to="/toilet">&#8989;</Link></Title></LeftArrow>
            <RightArrow><Title style={{transform: 'rotate(225deg)', fontSize:'66px'}}><Link to="/sprinkler">&#8990;</Link></Title></RightArrow>
        </BrownContainer>
      </main>
    )
  }
}


const FountainImage = styled.img `
  position: absolute;
  bottom: 0;
  transform: translate(0, 100%);
`;

export default Fountain
