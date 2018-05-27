import ToiletFlusher from './ToiletFlusher'
import { drizzleConnect } from 'drizzle-react'

// May still need this even with data function to refresh component on updates for this contract.
const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    Toilet: state.contracts.Toilet,
    drizzleStatus: state.drizzleStatus,
    tokens: state.app.tokens
  }
}


export default drizzleConnect(ToiletFlusher, mapStateToProps)
