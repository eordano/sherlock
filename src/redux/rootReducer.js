import { combineReducers } from 'redux'
import { routeReducer as router } from 'redux-simple-router'

import simpleKeys from '../keys/reducers'
import utxoPool from '../utxos/reducers'
import transaction from '../txcreator/reducers'
import broadcast from '../blockchain/reducers'

export default combineReducers({
  broadcast,
  transaction,
  simpleKeys,
  utxoPool,
  router
})
