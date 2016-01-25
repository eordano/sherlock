import definer from '../utils/definer'
import fetch from 'isomorphic-fetch'

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

const doBroadcast = tx => fetch('https://api.blockcypher.com/v1/btc/main/txs/push', {
  headers: {
    'Content-Type': 'application/json'
  },
  method: 'POST',
  body: JSON.stringify({ tx: tx.toString() })
})

// Async action
export const broadcastTransaction = (transaction) => {
  const txId = transaction.hash
  return (dispatch, getState) => {
    dispatch(actions.startBroadcast(txId))
    doBroadcast(transaction)
      .then(utxos => {
        dispatch(actions.broadcastSuccessful(txId))
      })
      .catch(err => {
        dispatch(actions.broadcastError(txId))
        console.log(err, err.stack)
      })
  }
}
actions.broadcastTransaction = broadcastTransaction

export default exportInitialState({
  broadcasting: false
})
