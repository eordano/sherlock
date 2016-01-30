import React from 'react'
import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'

export default createDevTools(
  <DockMonitor
    toggleVisibilityKey='ctrl-g'
    changePositionKey='ctrl-q' >
    <LogMonitor />
  </DockMonitor>
)
