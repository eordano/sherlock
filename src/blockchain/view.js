import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import Loading from '../components/loading'
import actions from './actions'

class BlockchainView extends React.Component {
  static propTypes = {
    blockchain: PropTypes.object,
    fetchBlockchainState: PropTypes.func.isRequired
  };

  componentDidMount () {
    if (!this.props.blockchain) {
      this.props.fetchBlockchainState()
    }
  }

  render () {
    if (!this.props.blockchain) {
      return <Loading />
    }
    const blockchainItems = [
      ['height', 'Current tip height'],
      ['hash', 'Tip hash'],
      ['last_fork_height', 'Last fork at height'],
      ['last_fork_hash', 'Last fork hash'],
      ['high_fee_per_kb', 'High priority fee (satoshis per kilobyte)'],
      ['medium_fee_per_kb', 'Mid priority fee'],
      ['low_fee_per_kb', 'Low priority fee']
    ].map(item => {
      return <li key={item[1]}>
        <span className='title'>{item[1]}</span>: { this.props.blockchain[item[0]] }
      </li>
    })
    return <div className='blockchain'>
      <h1><i className='fa fa-fw fa-bold'></i> Blockchain State</h1>
      <ul>
        { blockchainItems }
      </ul>
    </div>
  }
}

export default connect(state => state.blockchain, {
  fetchBlockchainState: actions.fetchBlockchainState
})(BlockchainView)
