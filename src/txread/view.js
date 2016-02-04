import React, { Component, PropTypes } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import bitcore from 'bitcore-lib'

import { actions as readActions } from './reducers'

export class TxDecoder extends Component {
  static propTypes = {
    tx: PropTypes.object,
    setPasted: PropTypes.func.isRequired
  };

  get txInfo() {
    if (!this.props.tx) {
      return ''
    }
    return <div className='col-md-6'>
        <h2>Transaction Info</h2>
        <ul>
          <li>Hash: {this.props.tx.hash}</li>
          <li>nLockTime: {this.props.tx.nLockTime}</li>
          <li>version: {this.props.tx.version}</li>
        </ul>
      </div>
  }

  get blockchainInfo() {
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

  get inputs() {
    if (!this.props.tx) {
      return ''
    }
    return <div className='col-md-6'>
      <h2>Inputs</h2>
      <div className='panel panel-default'>
        <div className='panel-heading'> 0000...0000</div>
        <div className='panel-body'>
          <p>Loading information...</p>
        </div>
      </div>
      <div className='panel panel-success'>
        <div className='panel-heading'> 0000...0000</div>
        <div className='panel-body'>
          <p>Script signature is correct</p>
        </div>
      </div>
      <div className='panel panel-warning'>
        <div className='panel-heading'> 0000...0000</div>
        <div className='panel-body'>
          <p>Script empty</p>
        </div>
      </div>
      <div className='panel panel-danger'>
        <div className='panel-heading'> 0000...0000</div>
        <div className='panel-body'>
          <p>Incorrect script</p>
        </div>
      </div>
    </div>
  }

  get outputs() {
    if (!this.props.tx) {
      return ''
    }
    return <div className='col-md-6'>
      <h2>Outputs</h2>
    </div>
  }

  paste(ev) {
    ev.preventDefault()
    this.props.setPasted(this.refs.rawtx.value)
  }

  render() {
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
        { this.inputs }
        { this.outputs }
      </div>
    </div>
  }
}

const mapStateToProps = state => ({
  tx: state.txread.tx
})

export default connect(mapStateToProps, _.merge({}, readActions))(TxDecoder)
