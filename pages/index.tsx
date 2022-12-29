import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/Header'

const Home = () => {
  return (
    <div className="realtive bg-gradient-to-b from-gray-900/10 to-[#010511] min-h-screen">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main>
        {/* Cover */}
        <section>{/* Rows */}</section>
      </main>
      {/* Modal */}
    </div>
  )
}

export default Home
