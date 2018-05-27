import React, { Component } from 'react'
import {Button } from 'react-bootstrap';
import { ContractForm } from 'drizzle-react-components'
import styled from "styled-components";

class Fountain extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props
  }

  render() {
    return(
      <main style={{display: 'flex', flexDirection: 'column', height: '100vh'}} className="main-container">
        <BlueContainer>
          <h1 style={{textAlign:'center'}}>The Token Fountain</h1>
          <p style={{textAlign:'center'}}>Throw a coin, make a wis-onlyh!</p>
          {/* <img src="/assets/images/fountain-only.svg"  style={{position:'absolute', bottom: '0'}}></img> */}
        </BlueContainer>
        <div style={{flex:'2'}}></div>
        <div style={{overflowX:'hidden'}}>
          <LandingImage src="/assets/images/fountain.svg"></LandingImage>
        </div>
        <BrownContainer>
            <p style={{textAlign:'center', color: 'white'}}>Throw 5 DAI into the Token Fountain and receive surprise tokens in return. Kitties, Dentacoin, or whatever the RNG decides.<b>Who knows what the future holds?</b></p>
            <ContractForm contract="Toilet" method="getSurprise"/>
            <a style={{ textAlign: 'center', color: 'white' }}>Wait, what?</a>
        </BrownContainer>
      </main>
    )
  }
}

const MainContainer = styled.div `
  background-color: #AFDEF8;
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: center;
`;
const BlueContainer = styled.div `
  background-color: #AFDEF8;
  flex: 5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  `;
  const BrownContainer = styled.div `
  background-color: #9A7E5C;
  flex: 5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 10px;
`;
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
