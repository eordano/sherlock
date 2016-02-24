import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import NotificationsWidget from './notifications'
import TestnetWidget from '../../network/widget'

const actions = {}

const mapStateToProps = state => ({
  notifications: state.notifications.notifications
})

class NavbarHeader extends Component {
  static propTypes = {
    notifications: PropTypes.array.isRequired
  };

  notificationsWidget () {
    return <NotificationsWidget notifications={this.props.notifications} />
  }

  testnetSwitch () {
    return <TestnetWidget />
  }

  render () {
    return (
      <div>
        <div className='navbar-header'>
          <button type='button' className='navbar-toggle' data-toggle='collapse' data-target='.navbar-ex1-collapse'>
            <span className='sr-only'>Toggle navigation</span>
            <span className='icon-bar'></span>
            <span className='icon-bar'></span>
            <span className='icon-bar'></span>
          </button>
          <Link to='/' className='navbar-brand'><i className='fa fa-eye' /> Sherlock Wallet</Link>
        </div>
        <ul className='nav navbar-right top-nav'>
          { this.notificationsWidget() }
          { this.testnetSwitch() }
        </ul>
        { /*
          <li className='dropdown'>
            <a href='#' className='dropdown-toggle' data-toggle='dropdown'><i className='fa fa-bell'></i> <b className='caret'></b></a>
              <ul className='dropdown-menu alert-dropdown'>
                <li>
                  <a href='#'>Alert Name <span className='label label-default'>Alert Badge</span></a>
                </li>
                <li className='divider'></li>
                <li>
                  <a href='#'>View All</a>
                </li>
              </ul>
            </li>
            <li className='dropdown'>
              <a href='#' className='dropdown-toggle' data-toggle='dropdown'><i className='fa fa-user'></i> John Smith <b className='caret'></b></a>
              <ul className='dropdown-menu'>
                <li>
                  <a href='#'><i className='fa fa-fw fa-user'></i> Profile</a>
                </li>
                <li>
                  <a href='#'><i className='fa fa-fw fa-envelope'></i> Inbox</a>
                </li>
                <li>
                  <a href='#'><i className='fa fa-fw fa-gear'></i> Settings</a>
                </li>
                <li className='divider'></li>
                <li>
                  <a href='#'><i className='fa fa-fw fa-power-off'></i> Log Out</a>
                </li>
              </ul>
            </li>
          </ul>
          */ }
      </div>
    )
  }
}

export default connect(mapStateToProps, actions)(NavbarHeader)
