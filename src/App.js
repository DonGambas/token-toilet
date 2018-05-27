import React, { Component } from 'react'
import agent from './util/agent';
import { drizzleConnect } from 'drizzle-react'


// Styles
import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    Toilet: state.contracts.Toilet,
    drizzleStatus: state.drizzleStatus,
    tokens: state.app.tokens
  }
}

const mapDispatchToProps = dispatch => ({
 getTokens: (payload) =>
   dispatch({type:'TOKENS_LOADED', payload})
});


class App extends Component {

  componentWillMount() {
    this.props.getTokens(agent.Tokens.getTokens())
  }

  render() {
    return (
      <div className="App">
        {this.props.children}
      </div>
    );
  }
}

export default drizzleConnect(App, mapStateToProps, mapDispatchToProps)
