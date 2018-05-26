import React, { Component } from 'react'

class Sprinkler extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props
  }

  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Sprinkler</h1>
            <p>This is the sprinkler page.</p>
          </div>
        </div>
      </main>
    )
  }
}

export default Sprinkler
