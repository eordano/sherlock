import React, { Component } from 'react'

export default class Sidebar extends Component {
  render () {
    return <div className='collapse navbar-collapse navbar-ex1-collapse'>
      <ul className='nav navbar-nav side-nav'>
        <li className='active'>
          <a href='index.html'><i className='fa fa-fw fa-dashboard'></i> Dashboard</a>
        </li>
        <li>
          <a href='charts.html'><i className='fa fa-fw fa-bar-chart-o'></i> Key Manager</a>
        </li>
        <li>
          <a href='tables.html'><i className='fa fa-fw fa-table'></i> Address Manager</a>
        </li>
        <li>
          <a href='tables.html'><i className='fa fa-fw fa-table'></i> Script Evaluation</a>
        </li>
        <li>
          <a href='forms.html'><i className='fa fa-fw fa-edit'></i> Transaction Decoder</a>
        </li>
        <li>
          <a href='bootstrap-elements.html'><i className='fa fa-fw fa-desktop'></i> Transaction Creator</a>
        </li>
        <li>
          <a href='bootstrap-grid.html'><i className='fa fa-fw fa-wrench'></i> Block Explorer</a>
        </li>
        <li>
          <a href='blank-page.html'><i className='fa fa-fw fa-file'></i> Settings</a>
        </li>
        <li>
          <a href='index-rtl.html'><i className='fa fa-fw fa-dashboard'></i> Debugger</a>
        </li>
      </ul>
    </div>
  }
}
