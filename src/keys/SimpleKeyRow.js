import React, { PropTypes } from 'react'

export default class SimpleKeyRow extends React.Component {
  static propTypes = {
    privateKey: PropTypes.object.isRequired
  };
  render () {
    return <tr>
      <td>{this.props.privateKey.toString()}</td>
      <td>{this.props.privateKey.toAddress().toString()}</td>
    </tr>
  }
}
