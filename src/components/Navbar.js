import React, { Component } from 'react'
import NavbarHeader from './NavbarHeader'
import Sidebar from './Sidebar'

export default class Navbar extends Component {
  render () {
    return <nav className='navbar navbar-inverse navbar-fixed-top' role='navigation'>
      <NavbarHeader />
      <Sidebar />
    </nav>
  }
}
