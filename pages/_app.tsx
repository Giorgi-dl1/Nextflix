import '../styles/globals.css'
import type { AppProps } from 'next/app'
import useAuth, { AuthProvider } from '../store/Auth'

function MyApp({ Component, pageProps }: AppProps) {
  const { loading } = useAuth()
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
