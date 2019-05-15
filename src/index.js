import React from 'react'
import { Router } from 'react-router-dom'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import App from './app'
import history from './app/history'
import './index.css'

ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>,
  document.getElementById('root')
)

serviceWorker.unregister()
