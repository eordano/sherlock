import { fork, take, put, call } from 'redux-saga'

import api from '../blockcypher'
import { actions } from './reducers'

import { utxoSetDiffer } from './logic'
import { wait } from '../app/util'

export default function* watchForSwitch (getState) {
  while (true) {
    const switchOver = yield take('SWITCH')

    yield fork([
      put(blockchain.startFetch()),
    ])
  }
}
