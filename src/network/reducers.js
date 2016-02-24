import definer from '../redux/definer'

const { reduce, exportInitialState } = definer(module.exports)

reduce('SWITCH', state => !!state)

export default exportInitialState(false)
