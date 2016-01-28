import { merge, omit } from 'lodash'
import definer from '../redux/definer'
import bitcore from 'bitcore-lib'

const { reduce, exportInitialState } = definer(module.exports)

reduce('ADD_PRIVATE_KEY', (state, { payload }) => {
  const key = bitcore.PrivateKey(payload)
  if (state[key.toString()]) {
    return state
  }
  return merge({}, state, { [key.toString()]: key })
})

reduce('DELETE_PRIVATE_KEY', (state, { payload }) => {
  const key = bitcore.PrivateKey(payload)
  if (!state[key.toString()]) {
    return state
  }
  return omit(state, key.toString())
})

module.exports.actions.generateRandom = () => {
  return dispatch => {
    dispatch(module.exports.actions.addPrivateKey(new bitcore.PrivateKey()))
  }
}

const key = '9d590ba22581385078d2f74d4366ee5242ddb4dd66f1673fd2f19ce70288acd4'

export default exportInitialState({[key]: new bitcore.PrivateKey(key)})
