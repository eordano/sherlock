import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { actions as keyActions } from './reducers'

import SimpleKeyTable from './SimpleKeyTable'
import SimpleKeyOptions from './SimpleKeyOptions'

const mapStateToProps = state => ({
  keys: state.simpleKeys
})

export class KeyManagerView extends React.Component {
  static propTypes = {
    keys: PropTypes.object.isRequired,
    generateRandom: PropTypes.func.isRequired,
    addPrivateKey: PropTypes.func.isRequired
  };

  render () {
    return <div className='container-fluid'>
      <div className='row'>
        <div className='col-lg-12'>
          <h1><i className='fa fa-fw fa-key'></i> Key Manager</h1>
        </div>
      </div>
      <SimpleKeyOptions {...this.props} />
      <br/>
      <div className='row'>
        <div className='col-xs-12'>
          <SimpleKeyTable keys={this.props.keys} />
        </div>
      </div>
    </div>
  }
}
export default connect(
  mapStateToProps,
  {
    generateRandom: keyActions.generateRandom,
    addPrivateKey: keyActions.addPrivateKey
  }
)(KeyManagerView)
