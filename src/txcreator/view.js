import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { actions as txActions } from './reducers'

const mapStateToProps = state => ({
})

export class TxCreator extends React.Component {
  static propTypes = {
  };

  render () {
    return <div className='container-fluid'>
    </div>
  }
}
export default connect(
  mapStateToProps, { }
)(TxCreator)
