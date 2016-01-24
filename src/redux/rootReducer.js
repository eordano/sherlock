import { combineReducers } from 'redux'
import { routeReducer as router } from 'redux-simple-router'
import simpleKeys from './modules/simpleKeys'
import utxoPool from './modules/utxoPool'
import transaction from './modules/transaction'

export default combineReducers({
  transaction,
  simpleKeys,
  utxoPool,
  router
})
