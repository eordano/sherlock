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
        <h1><i className='fa fa-fw fa-key'></i> Key Manager</h1>
      </div>
      <SimpleKeyOptions {...this.props} />
      <br/>
      <div className='row'>
        <SimpleKeyTable keys={this.props.keys} />
      </div>
      <div className='row'>
        <h2>Hierarchically Derived Keys (soon)</h2>
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
