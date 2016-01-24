import _ from 'lodash'
import { handleActions } from 'redux-actions'
import { merge, omit } from 'lodash'
import definer from '../utils/definer'
import bitcore from 'bitcore-lib'

const reduce = definer(module.exports)

reduce('NEW_TRANSACTION', (state, { payload }) => return new bitcore.Transaction())

reduce('ADD_INPUT', (state, { payload }) => {
  return new Transaction(state).from(payload)
})

reduce('ADD_SIGNATURE', (state, { payload }) => {
  return new Transaction(state).applySignature(payload)
})

reduce('ADD_OUTPUT', (state, { payload }) => {
  return new Transaction(state).to(payload)
})

reduce('REMOVE_INPUT', (state, { payload }) => {
  return new Transaction(state).removeInput(payload.txId, payload.outputIndex)
})

reduce('REMOVE_OUTPUT', (state, { payload }) => {
  return new Transaction(state).removeOutput(payload)
})

reduce('SET_VERSION', (state, { payload }) => {
  if (state.version !== payload) {
    const tx = new Transaction(state)
    tx.version = payload
    return tx
  }
  return state
})

reduce('SET_LOCKTIME', (state, { payload }) => {
  if (state.nLockTime !== payload) {
    const tx = new Transaction(state)
    tx.nLockTime = payload
    return tx
  }
  return state
})

export default handleActions(module.exports.__reducers, new bitcore.Transaction())

