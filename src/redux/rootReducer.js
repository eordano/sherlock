import { combineReducers } from 'redux'
import { routeReducer as router } from 'redux-simple-router'
import simpleKeys from './modules/simpleKeys'

export default combineReducers({
  simpleKeys,
  router
})
