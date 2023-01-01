import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth'
import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { auth } from '../firebase'

interface AuthInterface {
  user: User | null
  signUp: (email: string, password: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  error: string | null
  loading: boolean
}

interface AuthProviderInterface {
  children: React.ReactNode
}

const Auth = createContext<AuthInterface>({
  user: null,
  signIn: async () => {},
  signUp: async () => {},
  logout: async () => {},
  error: null,
  loading: false,
})

export const AuthProvider = ({ children }: AuthProviderInterface) => {
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const router = useRouter()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        setUser(null)
        setLoading(false)
        router.push('/login')
        return
      }

      setUser(user)
      setLoading(false)
    })
  }, [auth])

  const signUp = async (email: string, password: string) => {
    setLoading(true)
    await createUserWithEmailAndPassword(auth, email, password)
      .then((data) => {
        setUser(data.user)
        router.push('/')
      })
      .catch((e) => alert(e.message))
      .finally(() => setLoading(false))
  }

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    await signInWithEmailAndPassword(auth, email, password)
      .then((data) => {
        setUser(data.user)
        router.push('/')
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }

  const logout = async () => {
    setLoading(true)

    signOut(auth)
      .then(() => {
        setUser(null)
      })
      .catch((e) => setError(e))
      .finally(() => setLoading(false))
  }

  const value = useMemo(
    () => ({ user, error, loading, logout, signUp, signIn }),
    [user, loading, error],
  )

  return (
    <Auth.Provider value={value}>
      {loading ? <div>Loading...</div> : children}
    </Auth.Provider>
  )
}

export default function useAuth() {
  return useContext(Auth)
}
