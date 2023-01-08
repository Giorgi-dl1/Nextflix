import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../hooks/Auth'
import { StoreProvider } from '../hooks/Store'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </StoreProvider>
  )
}

export default MyApp
