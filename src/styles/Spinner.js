import styled, { keyframes } from 'styled-components'

// keyframes returns a unique name based on a hash of the contents of the keyframes
const rotate360 = keyframes `
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

// Here we create a component that will rotate everything we pass in over two seconds
const Spinner = styled.div `
  animation: ${rotate360} 1s linear infinite;
`;


export default Spinner
