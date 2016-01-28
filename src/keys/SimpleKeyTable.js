import React, { PropTypes } from 'react'
import _ from 'lodash'

import SimpleKeyRow from './SimpleKeyRow'

export default class SimpleKeyTable extends React.Component {
  static propTypes = {
    keys: PropTypes.object.isRequired
  };

  renderSimpleKeyRows () {
    return _.values(this.props.keys).map(value => <SimpleKeyRow
      privateKey={value}
      key={value.toString()}
    />)
  }

  render () {
    return <div className='panel panel-primary'>
      <div className='panel-heading'>
        <h3 className='panel-title'>Simple Keys</h3>
      </div>
      <table className='table'>
        <thead>
          <tr><th>Key</th><th>Address</th></tr>
        </thead>
        <tbody>
          { this.renderSimpleKeyRows() }
        </tbody>
      </table>
    </div>
  }
}
