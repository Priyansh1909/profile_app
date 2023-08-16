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

            return setAlert("Cannot be Empty")
        }

        const user = {Email:Email,password:password}

        await axios.post('/api/login',user).then((data)=>{
            console.log(data)
            router.push('/profile')
        })

    }


    return(
    
        <div className="w-100% mt-40 ml-96 mr-96 bg-white rounded">

            <h1 className="text-center">Login</h1>
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

            <button className=" text-black m-4 pl-2 pr-2 rounded " onClick={(e)=>{router.push('/signup')}} >Sign up</button>


            


            
        </div>
    )
}