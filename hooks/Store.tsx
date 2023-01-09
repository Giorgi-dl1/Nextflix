import {
  createContext,
  useContext,
  useMemo,
  useState,
  Dispatch,
  SetStateAction,
} from 'react'
import { Movie } from '../utils/interfaces'

interface StateInterface {
  coverPlaying: boolean
  setCoverPlaying: any
  modalMovie: Movie | null
  setModalMovie: any
}

const initialState = {
  coverPlaying: true,
  modalMovie: null,
  setCoverPlaying: () => {},
}

const Store = createContext<any>(initialState)

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [coverPlaying, setCoverPlaying] = useState(true)
  const [modalMovie, setModalMovie] = useState(null)

  console.log('store', modalMovie)

  const value = useMemo(
    () => ({
      coverPlaying,
      setCoverPlaying,
      modalMovie,
      setModalMovie,
    }),
    [coverPlaying, modalMovie],
  )
  return <Store.Provider value={value}>{children}</Store.Provider>
}

export default function useStore() {
  return useContext(Store)
}
