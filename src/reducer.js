import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { drizzleReducers } from 'drizzle'
import app from './reducers/app';


const reducer = combineReducers({
  app,
  routing: routerReducer,
  ...drizzleReducers
})

export default reducer
