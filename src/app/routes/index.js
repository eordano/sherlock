import React from 'react'
import { Route, IndexRoute, Redirect } from 'react-router'

import CoreLayout from 'app/CoreLayout'
import DashboardView from 'dashboard/view'
import KeyManager from 'keys/view'
import TxCreator from 'txcreator/view'
import TxDecoder from 'txread/view'
import Blockchain from 'blockchain/view'
import NotFoundView from 'app/views/notFound'

export default (
  <Route path='/' component={CoreLayout}>
    <IndexRoute component={DashboardView} />
    <Route path='/keys' component={KeyManager} />
    <Route path='/crafttx' component={TxCreator} />
    <Route path='/decodetx' component={TxDecoder} />
    <Route path='/blockchain' component={Blockchain} />
    <Route path='/404' component={NotFoundView} />
    <Redirect from='*' to='/404' />
  </Route>
)
