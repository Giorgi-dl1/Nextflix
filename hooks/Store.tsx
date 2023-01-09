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
  setCoverPlaying: Dispatch<boolean>
  modalMovie: Movie | null
  setModalMovie: Dispatch<Movie>
  favoriteMovies: Movie[]
  setFavoriteMovies: Dispatch<any>
  checkInFavorites: () => void
  removeFromFavorites: () => void
}

const initialState: StateInterface = {
  coverPlaying: true,
  modalMovie: null,
  setCoverPlaying: () => {},
  setModalMovie: () => {},
  setFavoriteMovies: () => {},
  favoriteMovies: [],
  checkInFavorites: () => {},
  removeFromFavorites: () => {},
}

const Store = createContext<any>(initialState)

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [coverPlaying, setCoverPlaying] = useState<boolean>(true)
  const [modalMovie, setModalMovie] = useState<Movie | null>(null)
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([])

  const addToFavorites = (movie: Movie) => {
    setFavoriteMovies((prevState) => [...prevState, movie])
  }

  const checkInFavorites = (id: number) => {
    const result = favoriteMovies.find((item) => item.id === id)
    return result ? true : false
  }

  const removeFromFavorites = (id: number) => {
    const updatedFavs = favoriteMovies.filter((movie) => movie.id !== id)
    console.log(updatedFavs)
    setFavoriteMovies(updatedFavs)
  }

  const value = useMemo(
    () => ({
      coverPlaying,
      setCoverPlaying,
      modalMovie,
      setModalMovie,
      favoriteMovies,
      addToFavorites,
      checkInFavorites,
      removeFromFavorites,
    }),
    [coverPlaying, modalMovie, favoriteMovies],
  )
  return <Store.Provider value={value}>{children}</Store.Provider>
}

export default function useStore() {
  return useContext(Store)
}
