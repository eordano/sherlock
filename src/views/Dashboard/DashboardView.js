import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  keys: state.simpleKeys.length,
  tx: state.transaction
})

export class DashboardView extends React.Component {
  static propTypes = {
    keys: PropTypes.number.isRequired,
    tx: PropTypes.object.isRequired
  };
  render () {
    return <div className='container-fluid'>
      <div className='row'>
        <div className='col-lg-12'>
          <h1 className='page-header'>Local Wallet Dashboard <small></small></h1>
          <ol className='breadcrumb'>
            <li className='active'>
              <i className='fa fa-dashboard'></i> Dashboard
            </li>
          </ol>
        </div>
      </div>
      <div className='row'>
        <div className='col-lg-12'>
          <div className='alert alert-info alert-dismissable'>
            <button type='button' className='close' data-dismiss='alert' aria-hidden='true'>&times;</button> <i className='fa fa-info-circle'></i> <strong>Like SB Admin?</strong> Try out <a href='http://startbootstrap.com/template-overviews/sb-admin-2' className='alert-link'>SB Admin 2</a> for additional features!
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
                  <div className='huge'>26</div>
                  <div>Keys controlled</div>
                </div>
              </div>
            </div>
            <a href='#'>
              <div className='panel-footer'>
                <span className='pull-left'>Manage</span>
                <span className='pull-right'><i className='fa fa-arrow-circle-right'></i></span>
                <div className='clearfix'></div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  }
}

export default connect(mapStateToProps)(DashboardView)
