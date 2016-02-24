import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

class NetworkWidget extends React.Component {
  static propTypes = {
    network: PropTypes.object.isRequired
  };
  render () {
    return <li className='dropdown'>
      <a href='#' className='dropdown-toggle' data-toggle='dropdown'>
        <i className='fa fa-wrench' />
      </a>
      <ul className='dropdown-menu alert-dropdown'>
        <li>
          <a href='#'>Enable testnet mode</a>
        </li>
        <li className='divider'></li>
        <li>
          <a href='#'>Faucet</a>
        </li>
      </ul>

    </li>
  }
}

export default connect(state => state)(NetworkWidget)
