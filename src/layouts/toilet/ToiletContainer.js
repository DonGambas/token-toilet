import Toilet from './Toilet'
import { drizzleConnect } from 'drizzle-react'

// May still need this even with data function to refresh component on updates for this contract.
const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    Toilet: state.contracts.Toilet,
    drizzleStatus: state.drizzleStatus
  }
}

const ToiletContainer = drizzleConnect(Toilet, mapStateToProps);

export default ToiletContainer
