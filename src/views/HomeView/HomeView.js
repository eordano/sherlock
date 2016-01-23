import React, { PropTypes } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { actions as keyActions } from '../../redux/modules/simpleKeys'

// We define mapStateToProps where we'd normally use
// the @connect decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
const mapStateToProps = (state) => ({ simpleKeys: state.simpleKeys })

export class HomeView extends React.Component {
  static propTypes = {
    simpleKeys: PropTypes.object.isRequired,
    addPrivateKey: PropTypes.func.isRequired,
    deletePrivateKey: PropTypes.func.isRequired
  };

  newKey () {
    this.props.addPrivateKey(this.refs.privKey.value)
  }

  render () {
    return (
      <div className='container text-center'>
        <div className='row'>
          <div className='col-xs-12'>
            <h1>Your Private Keys</h1>
          </div>
        </div>
        <div className='row'>
          <div className='col-xs-12'>
            <input ref='privKey'/>
            <button onClick={this.newKey.bind(this)} />
          </div>
        </div>
        <div className='row'>
          <div className='col-xs-12'>
          <ul>
            { _.values(this.props.simpleKeys).map(key => <p key={key.toString()}>{key.toString()}</p>) }
          </ul>
          </div>
        </div>
        <hr />
        <Link to='/404'>Go to 404 Page</Link>
      </div>
    )
  }
}

export default connect(mapStateToProps, keyActions)(HomeView)
