import React from 'react'
import App from 'next/app'
import Head from 'next/head'
import withReduxSaga from 'next-redux-saga'
import wrapper from '../store'
import { ThemeProvider } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '../config/theme'

class MarvelApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <>
        <Head>
          <title>Marvel</title>
          <style>{`
            #__next { height: 100vh; overflow: auto; }
          `}
          </style>
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </>
    )
  }
}

export default wrapper.withRedux(withReduxSaga(MarvelApp))
