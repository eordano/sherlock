import _ from 'lodash'
import { createAction, handleActions } from 'redux-actions'

const lowerCase = name => _.camelCase(name.split('_').join(' '))

export default (exports) => {
  const actions = exports.actions = {}
  exports.__reducers = {}

  const reduce = (name, reducer) => {
    const lower = lowerCase(name)
    const action = createAction(name)
    exports.name = name
    exports.actions[lower] = action
    exports[lower] = createAction(name)
    exports.__reducers[name] = reducer
  }

  const exportInitialState = state => handleActions(exports.__reducers, state)

  return { reduce, actions, exportInitialState }
}
