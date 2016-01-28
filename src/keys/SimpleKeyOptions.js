import React, { PropTypes } from 'react'
import bitcore from 'bitcore-lib'

export default class SimpleKeyOptions extends React.Component {

  static propTypes = {
    keys: PropTypes.object.isRequired,
    generateRandom: PropTypes.func.isRequired,
    addPrivateKey: PropTypes.func.isRequired
  };

  constructor (props, context, extra) {
    super(props, context, extra)
    this.state = {}
  }

  addKey (ev) {
    const value = this.refs.newKey.value
    ev.preventDefault()
    if (bitcore.PrivateKey.isValid(value)) {
      this.props.addPrivateKey(value)
    }
  }

  forgetError () {
    const value = this.refs.newKey.value
    if (bitcore.PrivateKey.isValid(value)) {
      this.setState({keyError: false})
    } else {
      this.setState({keyError: true})
    }
  }

  generateRandom (ev) {
    ev.preventDefault()
    this.props.generateRandom()
  }

  render () {
    const validPrivate = !this.state.keyError
    return <form className='form'>
      <div className={'form-group' + (!validPrivate ? ' has-feedback has-error' : '')}>
        <label className='control-label' htmlFor='newKey'>Add a private key</label>
        <input className='form-control'
               ref='newKey'
               onChange={() => this.forgetError()}
        />
        <span className='glyphicon glyphicon-remove form-control-feedback' aria-hidden='true'></span>
      </div>
      <div className='row'>
        <div className='col-sm-6 form-group'>
          <button
            className='btn btn-default'
            onClick={() => this.addKey()}
          >Add Key</button>
        </div>
        <div className='col-sm-6 form-group text-right'>
          <button className='btn btn-default'
                  onClick={() => this.generateRandom()}>
            Generate a random key
          </button>
        </div>
      </div>
    </form>
  }
}
