import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../hooks/Auth'
import { StoreProvider } from '../hooks/Store'
import Layout from '../components/Layout'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </StoreProvider>
  )
}

export default MyApp
