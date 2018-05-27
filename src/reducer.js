import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { drizzleReducers } from 'drizzle'
import app from './reducers/app';
import web3 from './util/web3/web3Reducer.js'


const reducer = combineReducers({
  web3,
  app,
  routing: routerReducer,
  ...drizzleReducers
})

export default reducer
