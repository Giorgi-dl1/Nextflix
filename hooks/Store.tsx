import {
  createContext,
  useContext,
  useMemo,
  useState,
  Dispatch,
  useEffect,
} from 'react'
import { Movie } from '../utils/interfaces'

interface StateInterface {
  coverMuted: boolean
  setCoverMuted: Dispatch<boolean>
  modalMovie: Movie | null
  setModalMovie: Dispatch<Movie>
  favoriteMovies: Movie[]
  setFavoriteMovies: Dispatch<any>
  checkInFavorites: () => void
  removeFromFavorites: () => void
  setMovieStatus: () => void
  checkStatus: () => void
}

interface MovieStatus {
  id: number
  status: string
}

const initialState: StateInterface = {
  coverMuted: true,
  modalMovie: null,
  setCoverMuted: () => {},
  setModalMovie: () => {},
  setFavoriteMovies: () => {},
  favoriteMovies: [],
  checkInFavorites: () => {},
  removeFromFavorites: () => {},
  setMovieStatus: () => {},
  checkStatus: () => {},
}

const Store = createContext<any>(initialState)

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [coverMuted, setCoverMuted] = useState<boolean>(true)
  const [modalMovie, setModalMovie] = useState<Movie | null>(null)
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([])
  const [statusedMovies, setStatusedMovies] = useState<MovieStatus[]>([])

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('favMovies'))) {
      setFavoriteMovies(JSON.parse(localStorage.getItem('favMovies')))
    }
    if (JSON.parse(localStorage.getItem('statusedMovies'))) {
      setStatusedMovies(JSON.parse(localStorage.getItem('statusedMovies')))
    }
  }, [])

  const addToFavorites = (movie: Movie) => {
    const updatedFavs = [...favoriteMovies, movie]
    localStorage.setItem('favMovies', JSON.stringify(updatedFavs))
    setFavoriteMovies(updatedFavs)
  }

  const removeFromFavorites = (id: number) => {
    const updatedFavs = favoriteMovies.filter((movie) => movie.id !== id)
    localStorage.setItem('favMovies', JSON.stringify(updatedFavs))
    setFavoriteMovies(updatedFavs)
  }

  const checkInFavorites = (id: number) => {
    const result = favoriteMovies.find((item) => item.id === id)
    return result ? true : false
  }

  const setMovieStatus = (id: number, status: string) => {
    const result = statusedMovies.find((item) => item.id === id)

    const updatedStatusedMovies =
      result?.status === status
        ? statusedMovies.filter((movie) => movie.id !== id)
        : result?.status
        ? statusedMovies.map((movie) =>
            movie.id !== id ? movie : { id, status },
          )
        : [...statusedMovies, { id, status }]

    localStorage.setItem(
      'statusedMovies',
      JSON.stringify(updatedStatusedMovies),
    )

    setStatusedMovies(updatedStatusedMovies)
  }

  const checkStatus = (id: number) => {
    const result = statusedMovies.find((item) => item.id === id)
    return result ? result.status : false
  }

  const value = useMemo(
    () => ({
      coverMuted,
      setCoverMuted,
      modalMovie,
      setModalMovie,
      favoriteMovies,
      addToFavorites,
      checkInFavorites,
      removeFromFavorites,
      setMovieStatus,
      checkStatus,
    }),
    [coverMuted, modalMovie, favoriteMovies, statusedMovies],
  )
  return <Store.Provider value={value}>{children}</Store.Provider>
}

export default function useStore() {
  return useContext(Store)
}
