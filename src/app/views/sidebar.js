import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  current: state.router.location.pathname
})

class SidebarItem extends Component {

  static propTypes = {
    link: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    soon: PropTypes.bool,
    current: PropTypes.string.isRequired
  };

  render () {
    const active = this.props.link === this.props.current
    const to = !this.props.soon ? this.props.link : '#'
    return <li>
      <Link to={to} className={active ? 'active' : ''}>
        <i className={`fa fa-fw fa-${this.props.icon}`}></i>
        &nbsp; {this.props.name}
        { this.props.soon ? <span className='label'>SOON</span> : '' }
      </Link>
    </li>
  }
}

export class Sidebar extends Component {

  static propTypes = {
    current: PropTypes.string.isRequired
  };

  render () {
    return <div className='collapse navbar-collapse navbar-ex1-collapse'>
      <ul className='nav navbar-nav side-nav'>
        <SidebarItem link='/' icon='dashboard' name='Dashboard'
                     current={this.props.current} />
        <SidebarItem link='/blockchain' icon='bold' name='Blockchain State'
                     current={this.props.current} />
        <SidebarItem link='/keys' icon='key' name='Key Manager'
                     current={this.props.current} />
        <SidebarItem link='/crafttx' icon='terminal' name='Transaction Creator'
                     current={this.props.current} />
        <SidebarItem link='/decodetx' icon='edit' name='Transaction Inspector'
                     current={this.props.current} />
        <SidebarItem link='/script' icon='bolt' name='Script Evaluation'
                     current={this.props.current} soon />
                     { /*
        <SidebarItem link='/address' icon='credit-card' name='Address Manager'
                     current={this.props.current} soon />
        <SidebarItem link='/multisig' icon='bars' name='Multisig Address'
                     current={this.props.current} soon />
        <SidebarItem link='/explorer' icon='search' name='Block Explorer'
                     current={this.props.current} soon />
                      */ }
      </ul>
    </div>
  }
}

export default connect(mapStateToProps)(Sidebar)
