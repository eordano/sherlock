import definer from '../redux/definer'

const { reduce, actions, exportInitialState } = definer(module.exports)

const update = (a, b) => Object.assign({}, a, b)

reduce('START_BROADCAST', (state, { payload }) => update(state, {
  broadcasting: true,
  error: null
}))

reduce('BROADCAST_SUCCESSFUL', (state, { payload }) => update(state, {
  broadcasting: false,
  error: null
}))

reduce('BROADCAST_ERROR', (state, { payload }) => update(state, {
  broadcasting: false,
  error: payload
}))

reduce('START_FETCH', (state, { payload }) => update(state, {
  fetching: true,
  error: payload
}))

reduce('FETCH_SUCCESSFUL', (state, { payload }) => update(state, {
  fetching: false,
  blockchain: payload,
  error: null
}))

reduce('FETCH_ERROR', (state, { payload }) => update(state, {
  fetching: false,
  error: payload
}))

module.exports.actions = actions

export default exportInitialState({
  broadcasting: false
})
