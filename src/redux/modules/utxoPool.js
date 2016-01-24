import { fetchUtxos } from '../utils/bitcoin'
import _ from 'lodash'
import definer from '../utils/definer'

const { reduce, actions, exportInitialState } = definer(module.exports)

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
    utxos: Object.assign({}, state.utxos, payload),
    fetchingAddresses: state.fetchingAddresses
  }
})

reduce('FINISH_FETCH', (state, { payload }) => {
  return {
    utxos: state.utxos,
    fetchingAddresses: _.filter(state.fetchingAddresses, element => element !== payload)
  }
})

// Async action
export const fetchForAddress = (address) => {
  return (dispatch, getState) => {
    dispatch(actions.startFetch(address))
    fetchUtxos(address)
      .then(utxos => {
        dispatch(actions.addUtxos({ [address]: utxos }))
        dispatch(actions.finishFetch(address))
      })
      .catch(err => {
        dispatch(actions.finishFetch(address))
        console.log(err, err.stack)
      })
  }
}
actions.fetchForAddress = fetchForAddress

export default exportInitialState({
  fetchingAddresses: [],
  utxos: {} // Maps from address to UTXO array
})
