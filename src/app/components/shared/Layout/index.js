import React from 'react'
import PropTypes from 'prop-types'
import Header from './components/Header'
import Footer from './components/Footer'

const Layout = props => {
  const { children } = props

  return (
    <div className="layout">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

export default Layout
