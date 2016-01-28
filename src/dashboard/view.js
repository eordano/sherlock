import React, { PropTypes } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { Link } from 'react-router'

const mapStateToProps = state => ({
  keys: state.simpleKeys,
  tx: state.transaction
})

export class DashboardView extends React.Component {
  static propTypes = {
    keys: PropTypes.object.isRequired,
    tx: PropTypes.object.isRequired
  };
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
        <div className='col-lg-3 col-md-6'>
          <div className='panel panel-primary'>
            <div className='panel-heading'>
              <div className='row'>
                <div className='col-xs-3'>
                  <i className='fa fa-comments fa-5x'></i>
                </div>
                <div className='col-xs-9 text-right'>
                  <div className='huge'>{_.size(this.props.keys)}</div>
                  <div>Keys controlled</div>
                </div>
              </div>
            </div>
            <Link to='/keys'>
              <div className='panel-footer'>
                <span className='pull-left'>Manage</span>
                <span className='pull-right'><i className='fa fa-arrow-circle-right'></i></span>
                <div className='clearfix'></div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  }
}

export default connect(mapStateToProps)(DashboardView)
