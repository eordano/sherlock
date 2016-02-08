import bitcore from 'bitcore-lib'
import definer from '../redux/definer'

const { reduce, exportInitialState } = definer(module.exports)

reduce('SET_PASTED', (state, { payload }) => {
  return Object.assign({}, state, { tx: new bitcore.Transaction(payload) })
})

reduce('START_FETCH_TXINFO', (state, { payload }) => {
  const prev = state.txInfo[payload]
  if (prev && typeof prev !== 'string') {
    return state
  }
  return Object.assign({}, state, { txInfo: { [payload]: 'fetching' } })
})

reduce('FETCHED_TX', (state, { payload }) => {
  return Object.assign({}, state, {
    txInfo: Object.assign({}, state.txInfo, {[payload.hash]: payload})
  })
})

reduce('ERROR_FETCH_TX', (state, { payload, error }) => {
  return Object.assign({}, state, {
    txInfo: Object.assign({}, state.txInfo, {[payload]: error})
  })
})

export default exportInitialState({
  txInfo: {}
})

