"use client"

import axios from "axios"
import { useState } from "react"
import { useRouter } from 'next/navigation'


export default function Login(){

    const router = useRouter()

    const [Email,SetEmail] = useState('')
    const [password,Setpassword] = useState('')
    const [Alert , setAlert] = useState('')


    const login = async (e)=>{
        e.preventDefault()
        console.log(Email)
        console.log(password)

        if (Email == '' || password == ''){

            
            return setAlert(<div className="bg-red-700 text-white  mt-2 text-center rounded bg-opacity-70">
           Cannot be Empty
            </div>)
        }

        const user = {Email:Email,password:password}

        await axios.post('/api/login',user).then((result)=>{
            console.log(result)

            if (result.data.success == false){
                setAlert(<div className="bg-red-700 text-white  mt-2 text-center rounded bg-opacity-70">
                {result.data.message}
                </div>)
                return
            }
            else if(result.data.success == true){

              router.push('/profile')
            }

        })

    }


    return(
        <>
    
        {/* <div className="w-100% mt-40 ml-96 mr-96 bg-white rounded">

            <h1 className="text-center">Login</h1>
            <div className="flex justify-center w-40">

            <form  className="text-xl">
                <div>

                <label className="pb-4 mt-4">Email</label>
                <br/>
                <input  placeholder="Email"  type="email" className="mt-4 mb-4 border-black border-2 w-6/12"  
                onChange={(e)=>{SetEmail(e.target.value)}}/>
                </div>
                <div>
                <label className="pb-4">Password</label>
                <br/>
                <input  placeholder="Password" type="password" className="mt-4 border-black border-2 w-6/12"  onChange={(e)=>{Setpassword(e.target.value)}}/>
                </div>
                <button className="bg-customBlue text-white m-4 pl-2 pr-2 rounded hover:bg-HoverBlue"  onClick={(e)=>{login(e)}}>Login</button>

            </form>
            </div>

            <button className=" text-black m-4 pl-2 pr-2 rounded " onClick={(e)=>{router.push('/signup')}} >Sign up</button>    
        </div> */}

<link rel="stylesheet" href="https://kit-pro.fontawesome.com/releases/v5.15.1/css/pro.min.css" />

<div class="min-h-screen flex flex-col items-center justify-center bg-gray-300">
  <div class="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
   
    
    <div class="mt-10">
      <form action="#">
        <div class="flex flex-col mb-6">
          <label for="email" class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">E-Mail Address:</label>
          <div class="relative">
            <div class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
              <svg class="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
            </div>

            <input id="email" type="email" name="email" class="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"   onChange={(e)=>{SetEmail(e.target.value)}} placeholder="E-Mail Address" />
          </div>
        </div>
        <div class="flex flex-col mb-6">
          <label for="password" class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Password:</label>
          <div class="relative">
            <div class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
              <span>
                <svg class="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </span>
            </div>

            <input id="password" type="password" name="password" class="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" onChange={(e)=>{Setpassword(e.target.value)}} placeholder="Password" />
          </div>
        </div>

        <div class="flex w-full">
          <button type="submit" class="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in"  onClick={(e)=>{login(e)}}>
            <span class="mr-2 uppercase">Login</span>
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
          <svg class="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
        </span>
        <button class="ml-2"  onClick={(e)=>{router.push('/signup')}} >You don't have an account?</button>
      
    </div>
    {Alert}
  </div>
</div>

        </>
        
    )
}