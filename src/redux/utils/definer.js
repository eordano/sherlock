import _ from 'lodash'
import { createAction, handleActions } from 'redux-actions'

const lowerCase = name => _.camelCase(name.split('_').join(' '))

export default (exports) => {
  exports.actions = {}
  exports.__reducers = {}

  const retFunc = (name, reducer) => {
    const lower = lowerCase(name)
    const action = createAction(name)
    exports.name = name
    exports.actions[lower] = action
    exports[lower] = createAction(name)
    exports.__reducers[name] = reducer
  }

  retFunc.exportInitialState = state => handleActions(exports.__reducers, state)

  return retFunc
}
