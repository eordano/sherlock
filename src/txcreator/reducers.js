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

reduce('PAY_TO', (state, { payload }) => {
  const newTx = new bitcore.Transaction(state)
  bitcore.Transaction.prototype.to.apply(newTx, payload)
  return newTx
})

reduce('ADD_OUTPUT', (state, { payload }) => {
  const newTx = new bitcore.Transaction(state)
  newTx.addOutput(payload)
  return newTx
})

reduce('REMOVE_INPUT', (state, { payload }) => {
  const newTx = new bitcore.Transaction(state)
  newTx.removeInput(payload.txId, payload.outputIndex)
  return newTx
})

reduce('REMOVE_OUTPUT', (state, { payload }) => {
  const newTx = new bitcore.Transaction(state)
  newTx.removeOutput(payload)
  return newTx
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

