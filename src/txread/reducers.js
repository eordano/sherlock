import definer from '../redux/definer'
import bitcore from 'bitcore-lib'

const { reduce, exportInitialState } = definer(module.exports)

reduce('SET_PASTED', (state, { payload }) => {
  return Object.assign({}, state, { tx: new bitcore.Transaction(payload) })
})

export default exportInitialState({})

