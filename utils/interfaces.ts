export interface Movie {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  media_type?: string
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  name?: string
  video: boolean | string
  vote_average: number
  vote_count: number
}

export interface HomeProps {
  trending: Movie[]
  netflixOriginals: Movie[]
  topRated: Movie[]
  comedy: Movie[]
  horror: Movie[]
  documentary: Movie[]
  action: Movie[]
  romance: Movie[]
}
