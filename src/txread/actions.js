import fetch from 'isomorphic-fetch'
import { actions } from './reducers'
import bitcore from 'bitcore-lib'

const requestTx = txId => {
  return fetch('https://insight.bitpay.com/api/rawtx/' + txId)
    .then(res => res.json())
    .then(tx => new bitcore.Transaction(tx.rawtx))
}

// Async action
export const fetchTransaction = (transactionId) => {
  return (dispatch, getState) => {
    dispatch(actions.startFetchTxinfo(transactionId))
    requestTx(transactionId)
      .then(tx => {
        dispatch(actions.fetchedTx(tx))
      })
      .catch(err => {
        console.log(err, err.stack)
        dispatch(actions.errorFetchTx(transactionId, err))
      })
  }
}
