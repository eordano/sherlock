import React from 'react'
import { Link } from 'react-router'

export class NotFoundView extends React.Component {
  render () {
    return (
      <div className='container-fluid text-center'>
        <div className='row'>
          <h1>Oops... nothing found here (404)</h1>
          <hr />
          <Link to='/'>Back To Dashboard</Link>
        </div>
      </div>
    )
  }
}

export default NotFoundView
