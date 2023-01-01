import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { SubmitHandler, useForm } from 'react-hook-form'
import useAuth from '../store/Auth'

interface Inputs {
  email: string
  password: string
  remember: string
}

const login = () => {
  const defaultEmail = localStorage.getItem('nextflixEmail')
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()

  const { signIn, error: authError } = useAuth()

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    await signIn(email, password)
  }

  return (
    <div
      className={`relative max-w-[100vw] min-h-screen overflow-x-hidden  bg-black md:bg-transparent ${
        authError ? 'pb-5' : ''
      }`}
    >
      <Head>
        <title>Nextflix</title>
      </Head>
      <Image
        src="https://rb.gy/p2hphi"
        className="object-cover opacity-60 -z-10"
        alt="background"
        fill
        sizes="(max-width:600px)100vw"
      />
      <header>
        <div className="text-xl font-bold text-red-600 cursor-pointer md:text-4xl">
          NEXTFLIX
        </div>
      </header>
      <main className="w-full px-5 pt-16 md:flex md:justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="text-[grey] md:max-w-[470px] w-full md:p-[60px] md:bg-black/75 rounded"
        >
          <h1 className="mb-10 text-3xl font-bold text-white">Sign In</h1>

          <div className="flex flex-col gap-3 mb-10">
            {authError && (
              <div className="bg-[#e87c03] text-white text-[15px] rounded -mt-2 px-4 py-3">
                Sorry, we can't find an account with this email address. Please
                try again or{' '}
                <Link href="/signup" className="underline">
                  create a new account.
                </Link>
              </div>
            )}
            <div
              className={`relative w-full ${watch('email') ? 'filled' : ''} `}
            >
              <input
                type="email"
                id="email"
                className={`input ${
                  errors.email ? 'border-b-2 border-[#e87c03]' : ''
                }`}
                {...register('email', { required: true })}
              />
              <label htmlFor="email" className="label">
                Email
              </label>
            </div>
            {errors.email && (
              <div className="text-[#e87c03] text-sm -mt-2">
                Please enter a valid email.
              </div>
            )}
            <div
              className={`relative w-full ${watch('password') ? 'filled' : ''}`}
            >
              <input
                type="password"
                className={`input ${
                  errors.email ? 'border-b-2 border-[#e87c03]' : ''
                }`}
                {...register('password', { required: true, minLength: 6 })}
                id="password"
              />
              <label htmlFor="password" className="label">
                Password
              </label>
            </div>{' '}
            {errors.password && (
              <div className="text-[#e87c03] text-sm -mt-2">
                Password must contain min characters.
              </div>
            )}
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
                <input type="checkbox" className="accent-[#b3b3b3]" />
                <label htmlFor="">Remember me</label>
              </div>
              <span className="cursor-pointer hover:underline">Need help?</span>
            </div>
            <div className="mt-3 md:mt-20">
              New to Nextflix?
              <Link href="/signup" className="text-white hover:underline">
                {' '}
                Sign Up now
              </Link>
              .
            </div>
          </div>
        </form>
      </main>
    </div>
  )
}

export default login
