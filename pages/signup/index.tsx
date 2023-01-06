import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { BsChevronCompactRight } from 'react-icons/bs'
import useAuth from '../../store/Auth'

interface Inputs {
  email: string
}

const index = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()

  const router = useRouter()

  const onSubmit: SubmitHandler<Inputs> = async ({ email }) => {
    router.push(`/signup/regform/${email}`)
  }

  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      router.push('/')
    }
  }, [user])

  return (
    <div className="absolute w-full min-h-screen ">
      <header>
        <div className="text-xl font-bold text-red-600 cursor-pointer md:text-4xl">
          NEXTFLIX
        </div>
        <Link href="/login">
          <button className="px-5 py-1 bg-red-600 rounded">Sign In</button>
        </Link>
      </header>
      <Image
        src="https://rb.gy/oxe9dh"
        className="object-cover opacity-80 -z-10"
        alt="background"
        fill
        sizes="(max-width:600px)100vw"
      />
      <main className="grid h-screen px-4 place-content-center bg-black/40">
        <div className="max-w-[670px] text-center">
          <h1 className="text-3xl md:text-5xl font-bold max-w-[650px]">
            Unlimited movies, TV shows, and more.
          </h1>
          <h2 className="pt-5 text-xl md:text-3xl pb-7 ">
            Watch anywhere. Cancel anytime.
          </h2>
          <h4 className="md:text-[18px] text-base">
            Ready to watch? Enter your email to create or restart your
            membership.
          </h4>
          <form
            className="flex flex-col mt-5 overflow-hidden rounded-sm md:flex-row gap-7 md:gap-0"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div
              className={`relative w-full ${watch('email') ? 'filled' : ''} `}
            >
              <input
                type="email"
                id="email"
                {...register('email', { required: true })}
                className={`w-full px-2 pb-4 text-black outline-none pt-7 ${
                  errors.email ? 'border-b-2 border-[#e87c03]' : ''
                }`}
              />
              <label htmlFor="email" className="text-[gray]  left-2 label">
                Email Address
              </label>{' '}
              {errors.email && (
                <div className="text-[#e87c03] text-left text-sm absolute mt-2 md:hidden">
                  Email is required!
                </div>
              )}
            </div>
            <button className="flex items-center px-5 py-2 mx-auto text-base bg-red-700 rounded-sm md:py-3 md:text-3xl max-w-max md:mx-0 min-w-max bg-red md:px-7">
              <span>Get Started</span> <BsChevronCompactRight />
            </button>
          </form>
          {errors.email && (
            <div className="text-[#e87c03] text-left text-sm absolute mt-2 hidden md:block">
              Email is required!
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default index
