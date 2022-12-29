import Head from 'next/head'
import Cover from '../components/Cover'
import Header from '../components/Header'
import { HomeProps } from '../utils/interfaces'
import requests from '../utils/requests'

const Home = ({
  trending,
  netflixOriginals,
  topRated,
  comedy,
  horror,
  documentary,
  action,
  romance,
}: HomeProps) => {
  if (!netflixOriginals.length) {
    return <div>Loading ...</div>
  }
  return (
    <div className="realtive bg-gradient-to-b from-gray-900/10 to-[#010511] min-h-screen">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="relative px-4 lg:px-16">
        <Cover movies={netflixOriginals} />
        <section>{/* Rows */}</section>
      </main>
      {/* Modal */}
    </div>
  )
}

export default Home

export const getServerSideProps = async () => {
  const [
    trending,
    netflixOriginals,
    topRated,
    comedy,
    horror,
    documentary,
    action,
    romance,
  ] = await Promise.all([
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
  ])
  return {
    props: {
      trending: trending.results,
      netflixOriginals: netflixOriginals.results,
      topRated: topRated.results,
      comedy: comedy.results,
      horror: horror.results,
      documentary: documentary.results,
      action: action.results,
      romance: romance.results,
    },
  }
}
