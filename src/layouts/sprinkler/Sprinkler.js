import React, { Component } from 'react'

class Sprinkler extends Component {
  constructor(props, context) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(){
    //check account DAI balanceOf if 5 or greater call method on contract, return new asset to user
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
