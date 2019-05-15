import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Layout from './components/shared/Layout'
import Main from './components/Main'

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route exact path="/" component={Main} />
        </Switch>
      </Layout>
    )
  }
}

export default App
