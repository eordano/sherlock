import { handleActions } from 'redux-actions'
import { merge, omit } from 'lodash'
import definer from '../utils/definer'
import bitcore from 'bitcore-lib'

const reduce = definer(module.exports)

reduce('ADD_PRIVATE_KEY', (state, { payload }) => {
  const key = bitcore.PrivateKey(payload)
  if (state[key.toString()]) {
    return state
  }
  return merge({}, state, { [key.toString()]: key })
}, {})

reduce('DELETE_PRIVATE_KEY', (state, { payload }) => {
  const key = bitcore.PrivateKey(payload)
  if (!state[key.toString()]) {
    return state
  }
  return omit(state, key.toString())
})

export default handleActions(module.exports.__reducers, {})
