import fetch from 'isomorphic-fetch'
import actions from './reducers'

const doBroadcast = tx => fetch('https://api.blockcypher.com/v1/btc/main/txs/push', {
  headers: { 'Content-Type': 'application/json' },
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

export default {
  broadcastTransaction
}
