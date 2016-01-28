import bitcore from 'bitcore-lib'
import fetch from 'isomorphic-fetch'
import _ from 'lodash'
import { actions } from './reducers'

const getUtxos = (tx, address) => {
  return tx.outputs
    .map((output, index) => { output.outputIndex = index; return output })
    .filter(output => _.indexOf(output.addresses, address) !== -1)
    .filter(output => output.spent_by === undefined)
    .map((output, i) => new bitcore.Transaction.UnspentOutput({
      txId: tx.hash,
      outputIndex: output.outputIndex,
      script: output.script,
      satoshis: output.value,
      address: address
    }))
}

const getUtxosFromResponse = (response, address) => {
  return response.json().then(json => _.flatten(json.txs.map(tx => getUtxos(tx, address))))
}

const fetchUtxos = address => {
  return fetch('https://api.blockcypher.com/v1/btc/main/addrs/' + address + '/full')
      .then(response => getUtxosFromResponse(response, address))
}

// Async action
export const fetchForAddress = (address) => {
  return (dispatch, getState) => {
    dispatch(actions.startFetch(address))
    fetchUtxos(address)
      .then(utxos => {
        dispatch(actions.addUtxos({ [address]: utxos }))
        dispatch(actions.finishFetch(address))
      })
      .catch(err => {
        dispatch(actions.finishFetch(address))
        console.log(err, err.stack)
      })
  }
}

export default {
  fetchForAddress
}
