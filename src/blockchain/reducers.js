import definer from '../redux/definer'

const { reduce, exportInitialState } = definer(module.exports)

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

export default exportInitialState({
  broadcasting: false
})
