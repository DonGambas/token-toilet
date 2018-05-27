import React, { Component } from 'react'
import {Button } from 'react-bootstrap';
import { ContractForm } from 'drizzle-react-components'
import styled from "styled-components";
import { MainContainer, BlueContainer, BrownContainer, Title, RegularText, TTButton} from '../../styles'


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
          <RegularText style={{textAlign:'center'}}>Throw a coin, make a wish-only!</RegularText>
          {/* <img src="/assets/images/fountain-only.svg"  style={{position:'absolute', bottom: '0'}}></img> */}
        </BlueContainer>
        <div style={{flex:'2'}}></div>
        <div style={{overflowX:'hidden'}}>
          <LandingImage src="/assets/images/fountain.svg"></LandingImage>
        </div>
        <BrownContainer>
            <RegularText style={{textAlign:'center', color: 'white'}}>Throw 5 DAI into the Token Fountain and receive surprise tokens in return. Kitties, Dentacoin, or whatever the RNG decides.<b>Who knows what the future holds?</b></RegularText>
            {/* <ContractForm contract="Toilet" method="getSurprise"/> */}
            <TTButton>Submit</TTButton>
            <a style={{ textAlign: 'center', color: 'white' }}>Wait, what?</a>
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
const LandingImage = styled.img `
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  object-fit: cover;
`;
export default Fountain
