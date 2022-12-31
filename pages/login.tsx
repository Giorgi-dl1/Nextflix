import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'

const login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  return (
    <div className="relative w-screen h-screen bg-black md:bg-transparent ">
      <Head>
        <title>Nextflix</title>
      </Head>
      <Image
        src="https://rb.gy/p2hphi"
        className="object-cover opacity-60 -z-10"
        alt="background"
        fill
        sizes="100%"
      />
      <header>
        <div className="text-xl font-bold text-red-600 cursor-pointer md:text-4xl">
          NEXTFLIX
        </div>
      </header>
      <main className="w-full px-5 pt-16 md:flex md:justify-center">
        <form
          action=""
          className="text-[grey] md:max-w-[470px] w-full md:p-[60px] md:bg-black/75 rounded"
        >
          <h1 className="mb-10 text-3xl font-bold text-white">Sign In</h1>
          <div className="flex flex-col gap-3 mb-10">
            <div className={`relative w-full ${email.length ? 'filled' : ''}`}>
              <input
                type="email"
                name="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                className="input "
              />
              <label htmlFor="email" className="label">
                Email or phone number
              </label>
            </div>
            <div
              className={`relative w-full ${password.length ? 'filled' : ''}`}
            >
              <input
                type="password"
                name="password"
                className="input"
                onChange={(e) => setPassword(e.target.value)}
                id="password"
              />
              <label htmlFor="password" className="label">
                Password
              </label>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-[#E50914] font-semibold py-3 rounded mb-2 text-white"
            >
              Sign In
            </button>
            <div className="flex justify-between text-sm ">
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  name="remember"
                  className="accent-[#b3b3b3]"
                />
                <label htmlFor="">Remember me</label>
              </div>
              <span className="cursor-pointer hover:underline">Need help?</span>
            </div>
            <div className="mt-3 md:mt-20">
              New to Nextflix?
              <span className="text-white hover:underline"> Sign Up now</span>.
            </div>
          </div>
        </form>
      </main>
    </div>
  )
}

export default login
