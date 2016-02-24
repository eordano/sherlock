import React, { PropTypes } from 'react'
import moment from 'moment'

class NoLinkNotification extends React.Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
  };

  render () {
    return <li className='message-preview'>
      <div className='empty text-center'>
        <p className='small text-muted'>{this.props.text}</p>
      </div>
    </li>
  }
}

class LinkNotification extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    media: PropTypes.string
  };

  render () {
    return <li className='message-preview'>
      <a href='#'>
        <div className='media'>
          <span className='pull-left'>
            <img className='media-object' src={ this.props.media || 'http://placehold.it/50x50'} alt='' />
          </span>
          <div className='media-body'>
            <h5 className='media-heading'><strong>{this.props.title}</strong></h5>
            <p className='small text-muted'><i className='fa fa-clock-o'></i> { moment(this.props.timestamp).fromNow() }</p>
            <p>{this.props.text}</p>
          </div>
        </div>
      </a>
    </li>
  }
}

class NotificationsWidget extends React.Component {
  static propTypes = {
    notifications: PropTypes.array.isRequired
  };

  notifications () {
    if (!this.props.notifications.length) {
      return <NoLinkNotification text='Notifications will appear here for new blocks and transactions' />
    }
    return this.props.notifications.map(notification => <Notification {...notification} />)
  }

  render () {
    return <li className='dropdown'>
      <a href='#' className='dropdown-toggle' data-toggle='dropdown'><i className='fa fa-bell'></i> <b className='caret'></b></a>
      <ul className='dropdown-menu message-dropdown'>
        { this.notifications() }
      </ul>
    </li>
  }
}

export default NotificationsWidget
