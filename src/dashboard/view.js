import React, { PropTypes } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'

import actions from '../blockchain/actions'

import Panel from './panel'

const mapStateToProps = state => ({
  keys: state.simpleKeys,
  tx: state.transaction,
  blockchain: state.blockchain.blockchain
})

export class DashboardView extends React.Component {
  static propTypes = {
    keys: PropTypes.object.isRequired,
    tx: PropTypes.object.isRequired,
    fetchBlockchainState: PropTypes.func.isRequired,
    blockchain: PropTypes.object
  };

  componentDidMount () {
    this.props.fetchBlockchainState()
  }

  render () {
    return <div className='container-fluid'>
      <div className='row'>
        <div className='col-lg-12'>
          <h1>Sherlock Dashboard</h1>
        </div>
      </div>
      <div className='row'>
        <div className='col-lg-12'>
          <div className='alert alert-info alert-dismissable'>
            <button type='button' className='close' data-dismiss='alert' aria-hidden='true'>&times;</button> <i className='fa fa-info-circle'></i> <strong>Feedback?</strong> You can <a href='mailto:eordano@gmail.com'>contact me</a> or open an <a href='https://github.com/eordano/sherlock/issues' target='_blank'>issue on GitHub</a>. Thanks!
          </div>
        </div>
      </div>
      <div className='row'>
        <Panel
            color='primary'
            icon='key'
            value={_.size(this.props.keys)}
            text='Keys controlled'
            action='Manage'
            link='keys'
        />
        <Panel
            color='primary'
            icon='link'
            value={this.props.blockchain
              ? this.props.blockchain.height
              : <i className='fa fa-spinner' /> }
            text='Block height'
            action='Blockchain state'
            link='blockchain'
        />
      </div>
    </div>
  }
}

export default connect(mapStateToProps,
  { fetchBlockchainState: actions.fetchBlockchainState }
)(DashboardView)
