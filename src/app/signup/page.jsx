"use client"

import { useState } from "react"
import { useRouter } from 'next/navigation'
import axios from "axios"




export default function Signup() {

  const router = useRouter()

  const [name, Setname] = useState('')
  const [Email, SetEmail] = useState('')
  const [password, Setpassword] = useState('')
  const [Confirmpassword, SetConfirmpassword] = useState('')
  const [Alert, SetAlert] = useState('')


  const signup = async (e) => {
    e.preventDefault()

    if (name == '' || Email == '' || password == '' || Confirmpassword == '') {
      SetAlert(<div className="bg-red-700 text-white  mt-2 text-center rounded bg-opacity-70">
        Cannot be Empty
      </div>)
      return
    }

    if (password != Confirmpassword) {

      SetAlert(<div className="bg-red-700 text-white  mt-2 text-center rounded bg-opacity-70">
        Password does not Match
      </div>)
      return
    }

    const user = { name: name, Email: Email, password: password }

    await axios.post('/api/signup', user).then((result) => {
      if (result.data.success == false) {
        SetAlert(<div className="bg-red-700 text-white  mt-2 text-center rounded bg-opacity-70">
          {result.data.message}
        </div>)
        return
      }
      else if (result.data.success == true) {

        router.push('/profile_edit')
      }
    })



  }

  return (
    <>
      <link rel="stylesheet" href="https://kit-pro.fontawesome.com/releases/v5.15.1/css/pro.min.css" />

      <div class="min-h-screen flex flex-col items-center justify-center bg-gray-300">
        <div class="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">


          <div class="mt-10">
            <form action="#">
              <div class="flex flex-col mb-6">
                <label for="name" class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Full Name</label>
                <div class="relative">
                  <div class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                  </div>

                  <input id="name" type="text" name="name" class="text-sm sm:text-base placeholder-gray-500 pl-4 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" onChange={(e) => { Setname(e.target.value) }} placeholder="Full Name" />
                </div>
              </div>
              <div class="flex flex-col mb-6">
                <label for="email" class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">E-Mail Address:</label>
                <div class="relative">
                  <div class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                  </div>
                  <input id="email" type="email" name="email" class="text-sm sm:text-base placeholder-gray-500 pl-4 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" onChange={(e) => { SetEmail(e.target.value) }} placeholder="E-Mail Address" />
                </div>
              </div>
              <div class="flex flex-col mb-6">
                <label for="password" class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Password:</label>
                <div class="relative">
                  <div class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                  </div>

                  <input id="password" type="password" name="password" class="text-sm sm:text-base placeholder-gray-500 pl-4 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" onChange={(e) => { Setpassword(e.target.value) }} placeholder="Password" />
                </div>
              </div>

              <div class="flex flex-col mb-6">
                <label for="Confirm-password" class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Confirm Password:</label>
                <div class="relative">
                  <div class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                  </div>

                  <input id="confirm_password" type="password" name="confirm_password" class="text-sm sm:text-base placeholder-gray-500 pl-4 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" onChange={(e) => { SetConfirmpassword(e.target.value) }} placeholder="Confirm Password" />
                </div>
              </div>

              <div class="flex w-full">
                <button type="submit" class="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in" onClick={(e) => { signup(e) }}>
                  <span class="mr-2 uppercase">Sign up</span>
                  <span>
                    <svg class="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                </button>
              </div>
            </form>
          </div>
          <div class="flex justify-center items-center mt-6">
            <span>
            </span>
            <button class="ml-2" onClick={(e) => { router.push('/login') }} >Already have an account?</button>

          </div>
          {Alert}
        </div>
      </div>
    </>
  );
};
