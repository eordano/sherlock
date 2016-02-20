import React from 'react'
import { Link } from 'react-router'
import { PropTypes } from 'react'

class Panel extends React.Component {
  static propTypes = {
    color: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    action: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired
  };

  render () {
    return <div className='col-lg-3 col-md-6'>
      <div className={'panel panel-' + this.props.color}>
        <div className='panel-heading'>
          <div className='row'>
            <div className='col-xs-3'>
              <i className={'fa fa-' + this.props.icon + ' fa-5x'}></i>
            </div>
            <div className='col-xs-9 text-right'>
              <div className='huge'>{ this.props.value }</div>
              <div>{ this.props.text }</div>
            </div>
          </div>
        </div>
        <Link to={'/' + this.props.link}>
          <div className='panel-footer'>
            <span className='pull-left'>{ this.props.action }</span>
            <span className='pull-right'><i className='fa fa-arrow-circle-right'></i></span>
            <div className='clearfix'></div>
          </div>
        </Link>
      </div>
    </div>
  }
}

export default Panel
