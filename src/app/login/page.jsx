"use client"

import axios from "axios"
import { useState } from "react"
import { useRouter } from 'next/navigation'


export default function Login() {

  const router = useRouter()

  const [Email, SetEmail] = useState('')
  const [password, Setpassword] = useState('')
  const [Alert, setAlert] = useState('')


  const login = async (e) => {
    e.preventDefault()

    if (Email == '' || password == '') {


      return setAlert(<div className="bg-red-700 text-white  mt-2 text-center rounded bg-opacity-70">
        Cannot be Empty
      </div>)
    }

    const user = { Email: Email, password: password }

    await axios.post('/api/login', user).then((result) => {

      if (result.data.success == false) {
        setAlert(<div className="bg-red-700 text-white  mt-2 text-center rounded bg-opacity-70">
          {result.data.message}
        </div>)
        return
      }
      else if (result.data.success == true) {

        router.push('/profile')
      }

    })

  }


  return (
    <>
      <link rel="stylesheet" href="https://kit-pro.fontawesome.com/releases/v5.15.1/css/pro.min.css" />

      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-300">
        <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">


          <div className="mt-10">
            <form action="#">
              <div className="flex flex-col mb-6">
                <label for="email" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">E-Mail Address:</label>
                <div className="relative">
                  <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                    <svg className="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>

                  <input id="email" type="email" name="email" className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" onChange={(e) => { SetEmail(e.target.value) }} placeholder="E-Mail Address" />
                </div>
              </div>
              <div className="flex flex-col mb-6">
                <label for="password" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Password:</label>
                <div className="relative">
                  <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                    <span>
                      <svg className="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </span>
                  </div>

                  <input id="password" type="password" name="password" className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" onChange={(e) => { Setpassword(e.target.value) }} placeholder="Password" />
                </div>
              </div>

              <div className="flex w-full">
                <button type="submit" className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in" onClick={(e) => { login(e) }}>
                  <span className="mr-2 uppercase">Login</span>
                  <span>
                    <svg className="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                </button>
              </div>
            </form>
          </div>
          <div className="flex justify-center items-center mt-6">
            <span>
              <svg className="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </span>
            <button className="ml-2" onClick={(e) => { router.push('/signup') }} >You don't have an account?</button>

          </div>
          {Alert}
        </div>
      </div>

    </>

  )
}