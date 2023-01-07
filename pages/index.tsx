import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Cover from '../components/Cover'
import Header from '../components/Header'
import Row from '../components/Row'
import useAuth from '../store/Auth'
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
  const router = useRouter()
  const { user } = useAuth()

  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user])
  return (
    <div className="min-h-screen realtive bg-gradient-to-b">
      <Head>
        <title>Home - Nextflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="relative overflow-hidden lg:">
        <Cover movies={netflixOriginals} />
        <section className="flex flex-col gap-3 -mt-6 mb-28 md:gap-6 md:-mt-24 md:mb-24">
          <Row title="Trending" movies={trending} />
          <Row title="Top Rated" movies={topRated} />
          <Row title="Action Thrillers" movies={action} />
          <Row title="Comedies" movies={comedy} />
          <Row title="Horror" movies={horror} />
          <Row title="Romance Movies" movies={romance} />
          <Row title="Documentaries" movies={documentary} />
        </section>
      </main>
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
