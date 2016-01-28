import _ from 'lodash'
import definer from '../redux/definer'

const { reduce, exportInitialState } = definer(module.exports)

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
    fetchingAddresses: _.filter(
      state.fetchingAddresses, element => element !== payload
    )
  }
})

export default exportInitialState({
  fetchingAddresses: [],
  utxos: {} // Maps from address to UTXO array
})
