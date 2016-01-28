import definer from '../redux/definer'
import bitcore from 'bitcore-lib'

const { reduce, exportInitialState } = definer(module.exports)

reduce('NEW_TRANSACTION', (state, { payload }) => new bitcore.Transaction())

reduce('ADD_INPUT', (state, { payload }) => {
  return new bitcore.Transaction(state).from(payload)
})

reduce('ADD_SIGNATURE', (state, { payload }) => {
  return new bitcore.Transaction(state).applySignature(payload)
})

reduce('ADD_OUTPUT', (state, { payload }) => {
  return bitcore.Transaction.prototype.to.apply(new bitcore.Transaction(state), payload)
})

reduce('REMOVE_INPUT', (state, { payload }) => {
  return new bitcore.Transaction(state).removeInput(payload.txId, payload.outputIndex)
})

reduce('REMOVE_OUTPUT', (state, { payload }) => {
  return new bitcore.Transaction(state).removeOutput(payload)
})

reduce('SET_VERSION', (state, { payload }) => {
  if (state.version !== payload) {
    const tx = new bitcore.Transaction(state)
    tx.version = payload
    return tx
  }
  return state
})

reduce('SET_LOCKTIME', (state, { payload }) => {
  if (state.nLockTime !== payload) {
    const tx = new bitcore.Transaction(state)
    tx.nLockTime = payload
    return tx
  }
  return state
})

export default exportInitialState(new bitcore.Transaction())

