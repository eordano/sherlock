import definer from '../redux/definer'

const { reduce, actions, exportInitialState } = definer(module.exports)

reduce('START_BROADCAST', (state, { payload }) => {
  return {
    broadcasting: true,
    error: null
  }
})
reduce('BROADCAST_SUCCESSFUL', (state, { payload }) => {
  return {
    broadcasting: false,
    error: null
  }
})
reduce('BROADCAST_ERROR', (state, { payload }) => {
  return {
    broadcasting: false,
    error: payload
  }
})

module.exports.actions = actions

export default exportInitialState({
  broadcasting: false
})
