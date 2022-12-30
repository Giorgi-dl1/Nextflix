import Head from 'next/head'
import Cover from '../components/Cover'
import Header from '../components/Header'
import Row from '../components/Row'
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
  return (
    <div className="min-h-screen realtive bg-gradient-to-b">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="relative pl-4 overflow-x-hidden lg:pl-16">
        <Cover movies={netflixOriginals} />
        <section className="mt-6 mb-6 space-y-6 md:mt-16 md:space-y-20 md:mb-10">
          <Row title="Trending" movies={trending} />
          <Row title="Top Rated" movies={topRated} />
          <Row title="Action Thrillers" movies={action} />
          <Row title="Comedies" movies={comedy} />
          <Row title="Horror" movies={horror} />
          <Row title="Romance Movies" movies={romance} />
          <Row title="Documentaries" movies={documentary} />
        </section>
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
