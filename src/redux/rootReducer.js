import { combineReducers } from 'redux'
import { routeReducer as router } from 'redux-simple-router'
import simpleKeys from './modules/simpleKeys'
import utxoPool from './modules/utxoPool'
import transaction from './modules/transaction'
import broadcast from './modules/broadcast'

export default combineReducers({
  broadcast,
  transaction,
  simpleKeys,
  utxoPool,
  router
})
