import React from 'react'
import { Route, IndexRoute, Redirect } from 'react-router'

import CoreLayout from 'app/CoreLayout'
import DashboardView from 'dashboard/view'
import KeyManager from 'keys/view'
import TxCreator from 'txcreator/view'
import NotFoundView from 'app/views/notFound'

export default (
  <Route path='/' component={CoreLayout}>
    <IndexRoute component={DashboardView} />
    <Route path='/keys' component={KeyManager} />
    <Route path='/crafttx' component={TxCreator} />
    <Route path='/404' component={NotFoundView} />
    <Redirect from='*' to='/404' />
  </Route>
)
