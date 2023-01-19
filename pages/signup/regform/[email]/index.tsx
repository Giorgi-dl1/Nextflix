import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import AuthFooter from '../../../../components/AuthFooter'
import Loading from '../../../../components/Loading'
import useAuth from '../../../../hooks/Auth'
import { getError, strToUpper } from '../../../../utils/utilities'

interface Inputs {
  email: any
  password: string
}

const index = () => {
  const router = useRouter()
  const email = router.query.email ? router.query.email : ''

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()

  const { signUp, error, resetError, user, loading } = useAuth()

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    await signUp(email, password)
  }

  const errMessage = getError(error)

  useEffect(() => {
    if (user) {
      router.push('/')
    }
  }, [user])

  return (
    <div className="absolute w-full min-h-screen text-black bg-white">
      <header>
        <div className="text-xl font-bold text-red-600 cursor-pointer md:text-4xl">
          NEXTFLIX
        </div>
        <Link onClick={() => resetError()} href="/login">
          <button className="px-5 py-1 text-white bg-red-600 rounded">
            Sign In
          </button>
        </Link>
      </header>

      <main className="grid h-screen px-4 place-content-center">
        <div className="max-w-[670px] ">
          <h1 className="text-2xl md:text-4xl max-w-[500px]">
            Create a password to start your membership
          </h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className=" md:max-w-[550px] w-full mt-5"
          >
            {error && (
              <div className="bg-red-500 my-5 text-white text-[15px] rounded -mt-2 px-4 py-3">
                {errMessage === 'email already in use' ? (
                  <span>
                    Email is already registered.{' '}
                    <Link
                      onClick={() => resetError()}
                      href="/login"
                      className="underline"
                    >
                      Sign In
                    </Link>
                  </span>
                ) : (
                  <span>{strToUpper(errMessage)}. Try again later</span>
                )}
              </div>
            )}
            <div className="flex flex-col gap-3 mb-10">
              <div
                className={`relative w-full ${
                  watch('email') | email?.length ? 'filled' : ''
                } `}
              >
                <input
                  type="email"
                  id="email"
                  className={`input bg-white focus:bg-white px-0 text-black `}
                  {...register('email', { required: true, value: email })}
                />
                <label htmlFor="email" className="label text-[gray] left-0">
                  Email
                </label>
                <div className="absolute top-0 bottom-0 left-0 right-0" />
              </div>
              {errors.email && (
                <div className="text-[#e87c03] text-sm -mt-2">
                  Please enter a valid email.
                </div>
              )}
              <div
                className={`relative w-full ${
                  watch('password') ? 'filled' : ''
                }`}
              >
                <input
                  type="password"
                  className={`input bg-white focus:bg-white border text-black ${
                    errors.password
                      ? ' border-red-700'
                      : watch('password')?.length >= 6
                      ? 'border-green-400'
                      : ''
                  }`}
                  {...register('password', { required: true, minLength: 6 })}
                  id="password"
                />
                <label htmlFor="password" className="label text-[gray]">
                  Password
                </label>
              </div>{' '}
              {errors.password && (
                <div className="text-[#e87c03] text-sm -mt-2">
                  Password must contain min 6 characters.
                </div>
              )}
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-[#E50914] font-semibold py-3 rounded mb-2 text-white"
              >
                {loading ? <Loading sm={true} /> : 'Sign Up'}
              </button>
            </div>
          </form>
        </div>
      </main>
      <AuthFooter white={true} />
    </div>
  )
}

export default index
