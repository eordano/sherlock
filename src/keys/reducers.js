import { merge, omit } from 'lodash'
import definer from '../redux/definer'
import bitcore from 'bitcore-lib'
import _ from 'lodash'

const { reduce, exportInitialState } = definer(module.exports)

reduce('ADD_PRIVATE_KEY', (state, { payload }) => {
  const key = bitcore.PrivateKey(payload)
  if (state[key.toString()]) {
    return state
  }
  const newKeys = merge({}, state, { [key.toString()]: key })
  localStorage.setItem('simpleKeys', JSON.stringify(_.keys(newKeys)))
  return newKeys
})

reduce('DELETE_PRIVATE_KEY', (state, { payload }) => {
  const key = bitcore.PrivateKey(payload)
  if (!state[key.toString()]) {
    return state
  }
  const newKeys = omit(state, key.toString())
  localStorage.setItem('simpleKeys', JSON.stringify(_.keys(newKeys)))
  return newKeys
})

module.exports.actions.generateRandom = () => {
  return dispatch => {
    dispatch(module.exports.actions.addPrivateKey(new bitcore.PrivateKey()))
  }
}

const keys = localStorage.getItem('simpleKeys')
let initialState = {}

if (keys) {
  initialState = _.fromPairs(JSON.parse(keys).map(
    key => [key, new bitcore.PrivateKey(key)]
  ))
}

export default exportInitialState(initialState)
