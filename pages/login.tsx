import Head from 'next/head'
import Image from 'next/image'
import { SubmitHandler, useForm } from 'react-hook-form'

interface Inputs {
  email: string
  password: string
}

const login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data)
  }
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
          onSubmit={handleSubmit(onSubmit)}
          className="text-[grey] md:max-w-[470px] w-full md:p-[60px] md:bg-black/75 rounded"
        >
          <h1 className="mb-10 text-3xl font-bold text-white">Sign In</h1>
          <div className="flex flex-col gap-3 mb-10">
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
                Email or phone number
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
