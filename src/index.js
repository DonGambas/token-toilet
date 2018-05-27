import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { DrizzleProvider } from 'drizzle-react'

// Layouts
import App from './App'
import HomeContainer from './layouts/home/HomeContainer'
import Toilet from './layouts/toilet/Toilet'
import ToiletFlusherContainer from './layouts/toiletflusher/ToiletFlusherContainer'
import FountainContainer from './layouts/fountain/FountainContainer'
import FountainThrowerContainer from './layouts/fountainthrower/FountainThrowerContainer'
import SprinklerContainer from './layouts/sprinkler/Sprinkler'

import { LoadingContainer } from 'drizzle-react-components'

import store from './store'
import drizzleOptions from './drizzleOptions'


// Initialize react-router-redux.
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render((
    <DrizzleProvider options={drizzleOptions} store={store}>
      <LoadingContainer>
        <Router history={history}>
          <Route path="/" component={App}>
            <IndexRoute component={HomeContainer} />
            <Route path="toilet" component={Toilet} />
            <Route path="toiletflusher" component={ToiletFlusherContainer} />
            <Route path="fountain" component={FountainContainer} />
            <Route path="fountainthrower" component={FountainThrowerContainer} />
            <Route path="sprinkler" component={SprinklerContainer} />
          </Route>
        </Router>
      </LoadingContainer>
    </DrizzleProvider>
  ),
  document.getElementById('root')
);
