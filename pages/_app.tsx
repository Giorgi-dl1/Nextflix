import '../styles/globals.css'
import Router from 'next/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../hooks/Auth'
import { StoreProvider } from '../hooks/Store'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const handleRouteStart = () => NProgress.start()
    const handleRouteDone = () => NProgress.done()

    Router.events.on('routeChangeStart', handleRouteStart)
    Router.events.on('routeChangeComplete', handleRouteDone)
    Router.events.on('routeChangeError', handleRouteDone)

    return () => {
      Router.events.off('routeChangeStart', handleRouteStart)
      Router.events.off('routeChangeComplete', handleRouteDone)
      Router.events.off('routeChangeError', handleRouteDone)
    }
  }, [])
  return (
    <StoreProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </StoreProvider>
  )
}

export default MyApp
