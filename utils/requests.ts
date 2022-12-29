const key = process.env.NEXT_PUBLIC_KEY
const url = 'https://api.themoviedb.org/3'

const requests = {
  fetchTrending: `${url}/trending/all/week?api_key=${key}&language=en-US`,
  fetchNetflixOriginals: `${url}/discover/movie?api_key=${key}&with_networks=213`,
  fetchTopRated: `${url}/movie/top_rated?api_key=${key}&language=en-US`,
  fetchActionMovies: `${url}/discover/movie?api_key=${key}&language=en-US&with_genres=28`,
  fetchComedyMovies: `${url}/discover/movie?api_key=${key}&language=en-US&with_genres=35`,
  fetchHorrorMovies: `${url}/discover/movie?api_key=${key}&language=en-US&with_genres=27`,
  fetchRomanceMovies: `${url}/discover/movie?api_key=${key}&language=en-US&with_genres=10749`,
  fetchDocumentaries: `${url}/discover/movie?api_key=${key}&language=en-US&with_genres=99`,
}

export default requests
