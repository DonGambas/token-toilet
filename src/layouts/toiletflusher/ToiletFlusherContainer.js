import ToiletFlusher from './ToiletFlusher'
import { drizzleConnect } from 'drizzle-react'

// May still need this even with data function to refresh component on updates for this contract.
const mapStateToProps = state => {
  console.log(state)
  return {
    accounts: state.accounts,
    Toilet: state.contracts.Toilet,
    drizzleStatus: state.drizzleStatus,
    tokens: state.app.tokens,
    web3Instance: state.web3Instance
  }
}

export default drizzleConnect(ToiletFlusher, mapStateToProps)
