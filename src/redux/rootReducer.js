import { combineReducers } from 'redux'
import { routerActions as router } from 'react-router-redux'

import network from '../network/reducers'
import simpleKeys from '../keys/reducers'
import utxoPool from '../utxos/reducers'
import transaction from '../txcreator/reducers'
import blockchain from '../blockchain/reducers'
import txread from '../txread/reducers'
import notifications from '../notifications/reducers'

export default combineReducers({
  blockchain,
  transaction,
  simpleKeys,
  notifications,
  network,
  utxoPool,
  txread,
  router
})
