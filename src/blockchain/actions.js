import fetch from 'isomorphic-fetch'
import { actions } from './reducers'

const network = getState => (getState().network === 'livenet') ? 'btc/main' : 'btc/test3'

const url = network => 'https://api.blockcypher.com/v1/' + network

const doBroadcast = (tx, network) => fetch(url(network) + '/txs/push', {
  headers: { 'Content-Type': 'application/json' },
  method: 'POST',
  body: JSON.stringify({ tx: tx.toString() })
})

// Async action
export const broadcastTransaction = (transaction) => {
  const txId = transaction.hash
  return (dispatch, getState) => {
    dispatch(actions.startBroadcast(txId))
    doBroadcast(transaction, network(getState))
      .then(utxos => {
        dispatch(actions.broadcastSuccessful(txId))
      })
      .catch(err => {
        dispatch(actions.broadcastError(txId))
        console.log(err, err.stack)
      })
  }
}

export const fetchBlockchainState = () => {
  return (dispatch, getState) => {
    dispatch(actions.startFetch())
    fetch(url(network(getState)))
      .then(state => {
        state.json().then(body => dispatch(actions.fetchSuccessful(body)))
      })
      .catch(err => {
        dispatch(actions.fetchError(err))
        console.log(err, err.stack)
      })
  }
}

export default {
  broadcastTransaction,
  fetchBlockchainState
}
