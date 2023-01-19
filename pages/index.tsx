import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Cover from '../components/Cover'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Loading from '../components/Loading'
import Modal from '../components/Modal'
import Row from '../components/Row'
import useAuth from '../hooks/Auth'
import useStore from '../hooks/Store'
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
  const { favoriteMovies, loading } = useStore()

  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user])

  return loading ? (
    <div className="grid w-screen h-screen bg-white place-content-center">
      <Loading />
    </div>
  ) : (
    <div className="min-h-screen realtive bg-gradient-to-b">
      <Head>
        <title>Home - Nextflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="relative pb-20 -mb-20 overflow-hidden ">
        <Cover movies={netflixOriginals} />
        <section className="relative flex flex-col gap-16 -mt-6 mb-28 md:gap-24 md:-mt-24 md:mb-24">
          <Row title="Trending" movies={trending} />
          <Row title="Top Rated" movies={topRated} />
          <Row title="Action Thrillers" movies={action} />
          <Row title="Comedies" movies={comedy} />
          <Row title="Horror" movies={horror} />
          <Row title="Romance Movies" movies={romance} />
          <Row title="Documentaries" movies={documentary} />
          {favoriteMovies.length ? (
            <Row title="My List" movies={favoriteMovies} />
          ) : null}
          <div className="absolute -top-[200px] -bottom-[250px] left-0 right-0 z-10" />
        </section>

        <Modal />
        <Footer />
      </div>
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
  ] = await axios.all([
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
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
