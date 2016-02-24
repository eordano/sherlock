import definer from '../redux/definer'

const { reduce, actions, exportInitialState } = definer(module.exports)

const update = (a, b) => Object.assign({}, a, b)

const append = (a, b) => Array.prototype.concat.apply([], a, [b])

reduce('NOTIFY', (state, { payload }) => update(state, {
  notifications: append(state.notifications, payload)
}))

export default exportInitialState({
  notifications: []
})
