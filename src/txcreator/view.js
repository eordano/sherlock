import React, { Component, PropTypes } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import utxoActions from '../utxos/actions'
import { actions as transactionActions } from './reducers'
import broadcastActions from '../blockchain/actions'
import bitcore from 'bitcore-lib'

class FetchButton extends React.Component {
  static propTypes = {
    fetchingAddresses: PropTypes.array.isRequired,
    fetchUtxos: PropTypes.func.isRequired,
    privateKey: PropTypes.object
  };
  render () {
    const hasKey = !!this.props.privateKey
    const address = hasKey ? this.props.privateKey.toAddress().toString() : ''
    const fetching = hasKey ? this.props.fetchingAddresses.indexOf(address) !== -1 : ''
    return <button
      key={'fetch-' + address}
      className='btn btn-primary'
      onClick={() => this.props.fetchUtxos(this.props.privateKey)}
      disabled={!hasKey || fetching}
    > { fetching ? 'Loading...' : 'Retrieve' } </button>
  }
}

class UseAsInput extends Component {
  static propTypes = {
    tx: PropTypes.object.isRequired,
    utxo: PropTypes.object.isRequired,
    addInput: PropTypes.func.isRequired,
    removeInput: PropTypes.func.isRequired
  };
  included () {
    return _.findIndex(this.props.tx.inputs, input => (
        input.prevTxIdStr === this.props.utxo.txIdStr &&
        input.outputIndex === this.props.utxo.outputIndex
    ))
  }
  check (ev) {
    const included = this.included()
    if (included !== -1) {
      return this.props.removeInput(this.props.utxo)
    } else {
      this.props.addInput(this.props.utxo)
    }
  }
  render () {
    const utxo = this.props.utxo
    return <tr>
      <td className='text-center'>
        <input className='checkbox'
          type='checkbox'
          checked={this.included() !== -1}
          onChange={this.check.bind(this)}
        />
      </td>
      <td>{utxo.satoshis}</td>
      <td>{utxo.address.toString()}</td>
      <td>{utxo.txIdStr}</td>
      <td>{utxo.outputIndex}</td>
    </tr>
  }
}

class UTXOFetch extends Component {
  static propTypes = {
    addInput: PropTypes.func.isRequired,
    removeInput: PropTypes.func.isRequired,

    simpleKeys: PropTypes.object.isRequired,
    fetchingAddresses: PropTypes.array.isRequired,
    utxos: PropTypes.object.isRequired,
    tx: PropTypes.object.isRequired,

    fetchForAddress: PropTypes.func.isRequired
  };

  constructor (props, context, extra) {
    super(props, context, extra)
    this.state = { currentKey: _.values(this.props.simpleKeys)[0] }
  }

  renderUTXORows () {
    return _.flatten(_.values(this.props.utxos)).map(utxo => (
        <UseAsInput utxo={utxo}
                  key={utxo.txIdStr + ':' + utxo.outputIndex}
                  tx={this.props.tx}
                  addInput={this.props.addInput}
                  removeInput={this.props.removeInput} />
    ))
  }

  renderPrivateKeysSelect () {
    return _.values(this.props.simpleKeys).map((value) => {
      const key = value.toString()
      const address = value.toAddress().toString()
      return <option
        key={key}
        value={key}
      >{address}</option>
    })
  }

  fetchForCurrentAddress () {
    return this.props.fetchForAddress(
      this.props.simpleKeys[this.refs.controlledAddress.value].toAddress().toString()
    )
  }

  setCurrentKey (ev) {
    this.setState({ currentKey: this.refs.controlledAddress.value })
  }

  render () {
    return <div className='panel panel-default'>
      <div className='panel-heading'>
        <h2 className='panel-title'>UTXO Selection</h2>
      </div>
      <div className='panel-body'>
        <form className='form'>
          <div className='form-group'>
            <label htmlFor='controlledAddress'>Fetch UTXOs for:</label>
            <select
              className='form-control'
              name='controlledAddress'
              ref='controlledAddress'
              onChange={ this.setCurrentKey.bind(this) }
            >
              { this.renderPrivateKeysSelect() }
            </select>
          </div>
          <div className='form-group'>
            <FetchButton
              fetchingAddresses={this.props.fetchingAddresses}
              fetchUtxos={() => this.fetchForCurrentAddress()}
              privateKey={this.props.simpleKeys[this.state.currentKey]}
            />
          </div>

        </form>
        <table className='table'>
          <thead>
            <tr>
              <th>Use?</th>
              <th>Satoshis</th>
              <th>Address</th>
              <th>Transaction Id</th>
              <th>Output</th>
            </tr>
          </thead>
          <tbody>
            { this.renderUTXORows() }
          </tbody>
        </table>
      </div>
    </div>
  }
}

class Inputs extends Component {
  static propTypes = {
    tx: PropTypes.object.isRequired,
    addSignature: PropTypes.func.isRequired,
    addressToKey: PropTypes.object.isRequired
  };

  sign (privateKey) {
    this.props.tx.getSignatures(privateKey).map(
      signature => this.props.addSignature(signature)
    )
  }

  renderInputs () {
    return this.props.tx.inputs.map(input => {
      const isSigned = input.isFullySigned()
      const key = input.prevTxIdStr + ':' + input.outputIndex
      const address = input.output.script.toAddress().toString()
      const privateKey = this.props.addressToKey[address]
      const signButton = <button
        className='btn btn-xs btn-default'
        onClick={() => this.sign(privateKey)}
        >Sign</button>
      return <tr key={key}>
        <td>
          { key }
          &nbsp;
          { isSigned ? <span className='label label-success'>signed</span>
                    : signButton }
        </td>
      </tr>
    })
  }

  render () {
    const satoshis = this.props.tx.inputs.reduce(
      (curr, next) => curr + next.output.satoshis, 0
    )
    return <div className='panel panel-default'>
      <div className='panel-heading'>
        <h2 className='panel-title'>Inputs ({satoshis} satoshis)</h2>
      </div>
      <div className='panel-body'>
        <table className='table table-striped table-bordered'>
          <tbody>
            { this.renderInputs() }
          </tbody>
        </table>
      </div>
    </div>
  }
}

class Outputs extends Component {
  static propTypes = {
    tx: PropTypes.object.isRequired,
    addOutput: PropTypes.func.isRequired,
    payTo: PropTypes.func.isRequired,
    removeOutput: PropTypes.func.isRequired
  };

  renderOutputs () {
    return this.props.tx.outputs.map((output, index) => {
      const key = 'output-' + index
      const remove = () => {
        this.props.removeOutput(index)
      }
      return <tr key={key}>
        <td>
          { output.script.toString() }
          ({output.satoshis} satoshis)
          <button className='btn btn-xs btn-warn' onClick={remove} >remove</button>
        </td>
      </tr>
    })
  }

  payToAddress (ev) {
    ev.preventDefault()
    this.props.payTo([this.refs.address.value, parseInt(this.refs.amount.value, 10)])
  }

  addData (ev) {
    ev.preventDefault()
    this.props.addOutput(new bitcore.Transaction.Output({
      script: bitcore.Script.buildDataOut(
        new Buffer(this.refs.opreturn.value, 'hex')
      ),
      satoshis: 0
    }))
  }

  addOutput (ev) {
    ev.preventDefault()
    this.props.addOutput(new bitcore.Transaction.Output({
      script: bitcore.Script(this.refs.script.value),
      satoshis: parseInt(this.refs.scriptAmount.value, 10)
    }))
  }

  render () {
    const satoshis = this.props.tx.outputs.reduce((curr, next) => curr + next.satoshis, 0)
    return <div className='panel panel-default'>
      <div className='panel-heading'>
        <h2 className='panel-title'>Outputs ({satoshis} satoshis)</h2>
      </div>
      <div className='panel-body'>
        <table className='table table-striped table-bordered'>
          <tbody>
            { this.renderOutputs() }
          </tbody>
        </table>
        <form className='form'>
          <h3>Pay to address</h3>
          <div className='form-group'>
            <label htmlFor='address'>Address</label>
            <input className='form-control' name='address' ref='address' />
          </div>
          <div className='form-group'>
            <label htmlFor='amount'>Amount (in satoshis)</label>
            <input className='form-control' name='amount' ref='amount' />
          </div>
          <div className='form-group'>
            <button className='btn btn-primary'
              onClick={this.payToAddress.bind(this)}>Add</button>
          </div>
          <h3>Add data (OP_RETURN)</h3>
          <div className='form-group'>
            <label htmlFor='opreturn'>Data (hexa encoded)</label>
            <input className='form-control' name='opreturn' ref='opreturn' />
          </div>
          <div className='form-group'>
            <button className='btn btn-primary'
              onClick={this.addData.bind(this)}>Add</button>
          </div>
          <h3>Custom script</h3>
          <div className='form-group'>
            <label htmlFor='script'>Script (opcodes or hexadecimal)</label>
            <input className='form-control' name='script' ref='script' />
          </div>
          <div className='form-group'>
            <label htmlFor='amount'>Amount (in satoshis)</label>
            <input className='form-control' name='scriptAmount' ref='scriptAmount' />
          </div>
          <div className='form-group'>
            <button className='btn btn-primary'
              onClick={this.addOutput.bind(this)}>Add</button>
          </div>
        </form>
      </div>
    </div>
  }
}

class Broadcast extends Component {
  static propTypes = {
    tx: PropTypes.object.isRequired,
    blockchain: PropTypes.object.isRequired,
    broadcastTransaction: PropTypes.func.isRequired
  };
  broadcast () {
    this.props.broadcastTransaction(this.props.tx.toString())
  }
  render () {
    return <button
      className='btn btn-primary'
      disabled={
        (this.props.tx.inputs.length === 0) || !this.props.tx.isFullySigned()
      }
      onClick={this.broadcast.bind(this)}>
      { this.props.blockchain.broadcasting ? 'Broadcasting...' : 'Broadcast' }
    </button>
  }
}

export class TxCreator extends Component {
  static propTypes = {
    addOutput: PropTypes.func.isRequired,
    addInput: PropTypes.func.isRequired,
    addSignature: PropTypes.func.isRequired,
    payTo: PropTypes.func.isRequired,

    removeInput: PropTypes.func.isRequired,
    removeOutput: PropTypes.func.isRequired,

    broadcastTransaction: PropTypes.func.isRequired,

    simpleKeys: PropTypes.object.isRequired,
    addressToKey: PropTypes.object.isRequired,
    fetchingAddresses: PropTypes.array.isRequired,
    utxos: PropTypes.object.isRequired,
    tx: PropTypes.object.isRequired,

    fetchForAddress: PropTypes.func.isRequired,

    blockchain: PropTypes.object.isRequired
  };

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
    return <div className='container-fluid'>
      <div className='row'>
        <div className='col-lg-12'>
          <h1><i className='fa fa-fw fa-terminal'></i> Transaction Creator</h1>
        </div>
      </div>
      <UTXOFetch simpleKeys={this.props.simpleKeys}
                 fetchingAddresses={this.props.fetchingAddresses}
                 utxos={this.props.utxos}
                 tx={this.props.tx}
                 fetchForAddress={this.props.fetchForAddress}
                 addInput={this.props.addInput}
                 removeInput={this.props.removeInput} />
      <div className='row'>
        <div className='col-xs-12 col-md-6'>
          <Inputs
                tx={this.props.tx}
                addSignature={this.props.addSignature}
                addressToKey={this.props.addressToKey}
          />
        </div>
        <div className='col-xs-12 col-md-6'>
          <Outputs tx={this.props.tx}
                  addOutput={this.props.addOutput}
                  payTo={this.props.payTo}
                  removeOutput={this.props.removeOutput} />
        </div>
      </div>
      <div className='text-center'>
        <Broadcast tx={this.props.tx}
                   broadcastTransaction={this.props.broadcastTransaction}
                   blockchain={this.props.blockchain}
        />
      </div>
    </div>
  }
}

const mapStateToProps = state => ({
  blockchain: state.blockchain,
  tx: state.transaction,
  simpleKeys: state.simpleKeys,
  addressToKey: _.transform(state.simpleKeys, (result, value) => {
    result[value.toAddress().toString()] = value
    return result
  }, {}),
  utxos: state.utxoPool.utxos,
  fetchingAddresses: state.utxoPool.fetchingAddresses
})

export default connect(
  mapStateToProps,
  _.merge({}, transactionActions, utxoActions, broadcastActions)
)(TxCreator)
