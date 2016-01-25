import React, { PropTypes } from 'react'
import _ from 'lodash'
import bitcore from 'bitcore-lib'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { actions as keyActions } from '../../redux/modules/simpleKeys'
import { actions as utxoActions } from '../../redux/modules/utxoPool'
import { actions as transactionActions } from '../../redux/modules/transaction'
import { actions as broadcastActions } from '../../redux/modules/broadcast'

// We define mapStateToProps where we'd normally use
// the @connect decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
const mapStateToProps = (state) => ({
  broadcast: state.broadcast,
  tx: state.transaction,
  simpleKeys: state.simpleKeys,
  utxos: state.utxoPool.utxos,
  fetchingAddresses: state.utxoPool.fetchingAddresses
})

class SignButton extends React.Component {
  static propTypes = {
    privateKey: PropTypes.object.isRequired,
    sign: PropTypes.func.isRequired
  };
  render () {
    return <button key={'sign-' + this.props.privateKey.toString()} onClick={() => this.props.sign()}>Sign Tx</button>
  }
}

class FetchButton extends React.Component {
  static propTypes = {
    fetchingAddresses: PropTypes.array.isRequired,
    fetchUtxos: PropTypes.func.isRequired,
    privateKey: PropTypes.object.isRequired
  };
  render () {
    const address = this.props.privateKey.toAddress().toString()
    const fetching = this.props.fetchingAddresses.indexOf(address) !== -1
    return <button
      key={'fetch-' + address}
      onClick={() => this.props.fetchUtxos(this.props.privateKey)}
      disabled={fetching}
    > { fetching ? 'Loading...' : 'Fetch' } </button>
  }
}

class UTXO extends React.Component {
  static propTypes = {
    addInput: PropTypes.func.isRequired,

    utxo: PropTypes.object.isRequired,
    tx: PropTypes.object.isRequired
  };
  render () {
    const utxo = this.props.utxo
    const name = utxo.txId + ':' + utxo.outputIndex
    const present = this.props.tx.inputs.filter(
      input => input.txId === utxo.txId && input.outputIndex === utxo.outputIndex
    ).length === 1
    return <p key={name}>
      {name + ' (' + utxo.satoshis + ', ' + utxo.address.toString() + ')'}
      {
        present
        ? ''
        : <button onClick={() => this.props.addInput(utxo)}>Add to tx</button>
      }
    </p>
  }
}

export class HomeView extends React.Component {
  static propTypes = {
    addOutput: PropTypes.func.isRequired,
    addInput: PropTypes.func.isRequired,

    broadcastTransaction: PropTypes.func.isRequired,

    simpleKeys: PropTypes.object.isRequired,
    fetchingAddresses: PropTypes.array.isRequired,
    utxos: PropTypes.object.isRequired,
    tx: PropTypes.object.isRequired,

    fetchForAddress: PropTypes.func.isRequired,
    addPrivateKey: PropTypes.func.isRequired,
    deletePrivateKey: PropTypes.func.isRequired,

    broadcast: {
      broadcasting: PropTypes.object.isRequired
    }
  };

  newKey () {
    this.props.addPrivateKey(this.refs.privKey.value)
  }

  generateRandom () {
    this.props.addPrivateKey(new bitcore.PrivateKey())
  }

  fetchUtxos (key) {
    this.props.fetchForAddress(key.toAddress().toString())
  }

  addOutput () {
    const address = this.refs.toAddress.value
    const amount = parseInt(this.refs.toSatoshis.value, 10)
    this.props.addOutput([address, amount])
  }

  broadcast () {
    this.props.broadcastTransaction(this.props.tx)
  }

  render () {
    return (
      <div className='container text-center'>
        <div className='row'>
          <div className='col-xs-12'>
            <h1>Your Private Keys</h1>
          </div>
        </div>
        <div className='row'>
          <div className='col-xs-12'>
            <button onClick={this.generateRandom.bind(this)}>Generate Random</button>
          </div>
          <div className='col-xs-12'>
            <input ref='privKey'/>
            <button onClick={this.newKey.bind(this)}>Add key</button>
          </div>
        </div>
        <div className='row'>
          <div className='col-xs-12'>
          <ul>
            { _.values(this.props.simpleKeys).map(key => <p key={key.toString()}>
                {key.toString()}
                <SignButton
                  privateKey={key}
                  sign={() => this.props.tx.sign(key)}
                />
                <FetchButton
                  privateKey={key}
                  fetchUtxos={this.fetchUtxos.bind(this)}
                  fetchingAddresses={this.props.fetchingAddresses}
                />
              </p>) }
          </ul>
          </div>
        </div>
        <div className='row'>
          <div className='col-xs-12'>
            <h1>UTXOs</h1>
          </div>
        </div>
        <div className='row'>
          <div className='col-xs-12'>
          <ul>
            { _.flatten(_.values(this.props.utxos))
              .map(utxo => <UTXO
                   utxo={utxo}
                   addInput={this.props.addInput}
                   tx={this.props.tx} />)}
          </ul>
          </div>
        </div>
        <div className='row'>
          <div className='col-xs-12'>
            <h1>Transaction</h1>
            <p>Hash: { this.props.tx.hash }</p>
            <p>Version: { this.props.tx.version }</p>
            <p>Nlocktime:: { this.props.tx.nLockTime }</p>
            <h3>Inputs ({this.props.tx.inputs.length })</h3>
            { this.props.tx.inputs.map(input => input.prevTxId.toString('hex') + ':' + input.outputIndex + ' - ' + (input.isFullySigned() ? 'signed' : 'unsigned') + ' - output script: ' + input.output.script) }
            <h3>Outputs ({this.props.tx.outputs.length })</h3>
            { this.props.tx.outputs.map(output => output.script.toAddress() + ' (' + output.satoshis + ')') }
          </div>
          <div className='col-xs-12'>
            <input ref='toAddress'/>
            <input ref='toSatoshis'/>
            <button onClick={this.addOutput.bind(this)}>Add Output</button>
          </div>
          <div className='col-xs-12'>
            <button
              disabled={this.props.broadcast.broadcasting}
              onClick={() => this.broadcast()}>

              { this.props.broadcast.broadcasting ? 'Broadcasting...' : 'Broadcast' }
            </button>
          </div>
        </div>
        <hr />
        <Link to='/404'>Go to 404 Page</Link>
      </div>
    )
  }
}

export default connect(mapStateToProps,
  _.merge({}, transactionActions, keyActions, utxoActions, broadcastActions)
)(HomeView)
