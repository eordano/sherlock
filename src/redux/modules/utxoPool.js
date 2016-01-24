import { handleActions } from 'redux-actions'
import { fetchUtxos } from '../utils/bitcoin'
import _ from 'lodash'
import definer from '../utils/definer'
import bitcore from 'bitcore-lib'

const reduce = definer(module.exports)

reduce('START_FETCH', (state, { payload }) => {
  if (!state.fetchingAddresses[payload]) {
    return {
      utxos: state.utxos,
      fetchingAddresses: _.concat(state.fetchingAddresses, [payload])
    }
  }
  return state
})

reduce('ADD_UTXOS', (state, { payload }) => {
  return {
    utxos: Object.assign({}, state.utxos, { payload }),
    fetchingAddresses: state.fetchingAddresses
  }
})

reduce('FINISH_FETCH', (state, { payload }) => {
  if (state.fetchingAddresses[payload]) {
    return {
      utxos: state.utxos,
      fetchingAddresses: _.without(state.fetchingAddresses, payload)
    }
  }
  return state
})

// Async action
export const fetchForAddress(address) => {
  return (dispatch, getState) => {
    dispatch(reduce.actions.startFetch(address))
    fetchUtxos(address)
      .then(utxos => {
        dispatch([
          addUtxos({ [address]: utxos }),
          finishFetch(address)
        ])
      })
      .catch(err => {
        dispatch(finishFetch(address))
        console.log(err, err.stack)
      })
  }
}
module.exports.actions[fetchForAddress] = fetchForAddress

export default reduce.exportInitialState({
  fetchingAddresses: [],
  utxos: {} // Maps from address to UTXO array
})
