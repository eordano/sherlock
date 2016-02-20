import React, { Component, PropTypes } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import bitcore from 'bitcore-lib'

import * as fetchActions from './actions'
import { actions as readActions } from './reducers'

class Input extends Component {
  static propTypes = {
    input: PropTypes.object.isRequired,
    txInfo: PropTypes.object.isRequired,
    fetchTx: PropTypes.func.isRequired,
    tx: PropTypes.object.isRequired,
    inputIndex: PropTypes.number.isRequired
  };

  componentDidMount () {
    const txId = this.props.input.prevTxId.toString('hex')
    if (!this.props.txInfo[txId]) {
      this.props.fetchTx(txId)
    }
  }

  evaluate () {
    const interpreter = new bitcore.Script.Interpreter()
    const scriptSig = this.props.input.script
    const prevTxId = this.props.input.prevTxId.toString('hex')
    const pubKey = this.props.txInfo[prevTxId].outputs[this.props.input.outputIndex].script
    const tx = this.props.tx
    const nin = this.props.inputIndex

    const result = interpreter.verify(scriptSig, pubKey, tx, nin,
      [
        'SCRIPT_VERIFY_CHECKLOCKTIMEVERIFY',
        'SCRIPT_VERIFY_DERSIG',
        'SCRIPT_VERIFY_STRICTENC',
        'SCRIPT_VERIFY_P2SH'
      ].reduce((prev, el) => prev + bitcore.Script.Interpreter[el], 0)
    )

    return { interpreter, result }
  }

  render () {
    const txId = this.props.input.prevTxId.toString('hex')
    let color = 'default'
    let evaluation
    let scriptPubKey = ''

    if (this.props.txInfo[txId] && this.props.txInfo[txId].outputs) {
      if (this.props.input.script.chunks.length === 0) {
        color = 'warning'
      } else {
        evaluation = this.evaluate()
        if (evaluation.result) {
          color = 'success'
          scriptPubKey = 'ScriptPubKey: ' + this.props.txInfo[txId].outputs[this.props.input.outputIndex].script.toString()
        } else {
          color = 'danger'
          scriptPubKey = <div>ScriptPubKey: <ul> {this.props.txInfo[txId].outputs[this.props.input.outputIndex].script.chunks.map((chunk, index) => {
            if (index === evaluation.interpreter.pc - 1) {
              return <li><strong>{bitcore.Opcode.reverseMap[chunk.opcodenum]}</strong></li>
            }
            return <li>{bitcore.Opcode.reverseMap[chunk.opcodenum] || chunk.buf.toString('hex')}</li>
          })}</ul> </div>
        }
      }
    }
    const txIdPlusIndex = txId + ':' + this.props.input.outputIndex

    const evalResult = evaluation && !evaluation.result
      ? <p>Failed with code: {evaluation.interpreter.errstr}<br/>
          At position {evaluation.interpreter.pc} ({
            bitcore.Opcode.reverseMap[new bitcore.Script(evaluation.interpreter.script).chunks[evaluation.interpreter.pc - 1].opcodenum]
          })</p>
      : ''

    return <div className={'panel panel-' + color} key={txIdPlusIndex}>
        <div className='panel-heading'><small>{txIdPlusIndex}</small></div>
        <div className='panel-body'>
          { scriptPubKey }
          <p>ScriptSig: { this.props.input.script.toString() }</p>
          { evalResult }
        </div>
      </div>
  }
}

class Output extends Component {
  static propTypes = {
    output: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired
  };
  render () {
    const txIdPlusIndex = this.props.index + ' - ' + this.props.output.satoshis + ' satoshis - ' + this.props.output.script.toAddress().toString()
    return <div className='panel panel-default'>
      <div className='panel-heading'><small>{txIdPlusIndex}</small></div>
      <div className='panel-body'>
        <p>{this.props.output.script.toAddress().toString()}</p>
        <p>{this.props.output.script.toString()}</p>
      </div>
    </div>
  }
}

export class TxDecoder extends Component {
  static propTypes = {
    tx: PropTypes.object,
    setPasted: PropTypes.func.isRequired,
    fetchTransaction: PropTypes.func.isRequired,
    txInfo: PropTypes.object.isRequired
  };

  get txInfo () {
    if (!this.props.tx) {
      return ''
    }
    return <div className='col-md-6'>
        <h2>Transaction </h2>
        <ul>
          <li>Hash: {this.props.tx.hash}</li>
          <li>nLockTime: {this.props.tx.nLockTime}</li>
          <li>version: {this.props.tx.version}</li>
        </ul>
      </div>
  }

  get blockchainInfo () {
    if (!this.props.tx) {
      return ''
    }
    return <div className='col-md-6'>
      <h2>Blockchain Info</h2>
      <ul>
        <li />
      </ul>
    </div>
  }

  drawInput (input, index) {
    return <Input input={input}
                  fetchTx={this.props.fetchTransaction}
                  txInfo={this.props.txInfo}
                  tx={this.props.tx}
                  inputIndex={index}
    />
  }

  drawOutput (output, index) {
    return <Output output={output} index={index}/>
  }

  get inputs () {
    if (!this.props.tx) {
      return ''
    }
    return <div className='col-md-6'>
      <h2>Inputs</h2>
      { this.props.tx.inputs.map((input, index) => this.drawInput(input, index)) }
    </div>
  }

  get outputs () {
    if (!this.props.tx) {
      return ''
    }
    return <div className='col-md-6'>
      <h2>Outputs</h2>
      { this.props.tx.outputs.map((output, index) => this.drawOutput(output, index)) }
    </div>
  }

  paste (ev) {
    ev.preventDefault()
    this.props.setPasted(this.refs.rawtx.value)
  }

  render () {
    return <div className='container-fluid'>
      <div className='row'>
        <div className='col-lg-12'>
          <h1><i className='fa fa-fw fa-search'></i> Transaction Decoder</h1>
          <form className='form'>
            <div className='form-group'>
              <textarea className='form-control' ref='rawtx'/>
            </div>
            <div className='form-group'>
              <button type='button'
                      className='btn btn-primary'
                      onClick={this.paste.bind(this)}
                      >Inspect</button>
            </div>
          </form>
        </div>
      </div>
      <div className='row'>
        { this.txInfo }
        { this.blockchainInfo }
      </div>
      <div className='row'>
        { this.inputs }
        { this.outputs }
      </div>
    </div>
  }
}

const mapStateToProps = state => ({
  tx: state.txread.tx,
  txInfo: state.txread.txInfo,
  txBlockchain: state.txread.blockchain
})

export default connect(mapStateToProps, _.merge({}, readActions, fetchActions))(TxDecoder)
