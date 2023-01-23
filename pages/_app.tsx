import '../styles/globals.css'
import Router from 'next/router'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../hooks/Auth'
import { StoreProvider } from '../hooks/Store'
import { useEffect, useState } from 'react'
import Loading from '../components/Loading'

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const start = () => {
      console.log('start')
      setLoading(true)
    }
    const end = () => {
      console.log('finished')
      setLoading(false)
    }
    Router.events.on('routeChangeStart', start)
    Router.events.on('routeChangeComplete', end)
    Router.events.on('routeChangeError', end)
    return () => {
      Router.events.off('routeChangeStart', start)
      Router.events.off('routeChangeComplete', end)
      Router.events.off('routeChangeError', end)
    }
  }, [])
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <StoreProvider>
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </StoreProvider>
      )}
    </>
  )
}

export default MyApp
