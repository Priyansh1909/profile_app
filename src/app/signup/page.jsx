"use client"

import { useState } from "react"
import {useRouter} from 'next/navigation'
import axios from "axios"




export default function Signup() {
    
    const router = useRouter()

    const [name,Setname] = useState('')
    const [Email,SetEmail] = useState('')
    const [password,Setpassword] = useState('')
    const [Confirmpassword,SetConfirmpassword] = useState('')
    const [alert,Setalert] = useState('')


    const signup = async (e)=>{
        e.preventDefault()
        console.log(name)
        console.log(Email)
        console.log(password)

        if (name == '' || Email == '' || password == '' || Confirmpassword == ''){
            Setalert("Cannot be Empty")
            return
        }

        if (password != Confirmpassword){
            Setalert("Password does not Match")
            return
        }
        console.log("heree")

        const user = {name : name , Email:Email,password:password}

        await axios.post('/api/signup',user).then((data)=>{console.log(data)})

        
        
    }

    return (
        <>
            <div className="w-100% mt-40 ml-96 mr-96 bg-white rounded">

                <h1 className="text-center">Sign up</h1>
                <form className="text-xl">
                    <div>
                        <label className="pb-4 mt-4">Full Name</label>
                        <br />
                        <input placeholder="Full Name" type="text" className="mt-4 mb-4 border-black border-2 w-6/12"  
                        onChange={(e)=>{Setname(e.target.value)}}/>
                    </div>
                    <div>
                        <label className="pb-4 mt-4">Email</label>
                        <br />
                        <input placeholder="Email" type="email" className="mt-4 mb-4 border-black border-2 w-6/12" 
                        onChange={(e)=>{SetEmail(e.target.value)}}/>
                    </div>
                    <div>
                        <label className="pb-4">Password</label>
                        <br />
                        <input placeholder="Password" type="password" className="mt-4 border-black border-2 w-6/12" 
                        onChange={(e)=>{Setpassword(e.target.value)}}/>
                    </div>
                    <div>
                        <label className="pb-4">Confirm Password</label>
                        <br />
                        <input placeholder="Confirm Password" type="password" className="mt-4 border-black border-2 w-6/12" 
                        onChange={(e)=>{SetConfirmpassword(e.target.value)}}/>
                    </div>
                    <button className="bg-customBlue text-white m-4 pl-2 pr-2 rounded hover:bg-HoverBlue" onClick={(e)=>{signup(e)}} >Signup</button>
                    {alert}
                </form>

                <button className="bg-customBlue text-white m-4 pl-2 pr-2 rounded hover:bg-HoverBlue" onClick={(e)=>{router.push('/login')}} >Login</button>



            </div>
        </>
    );
};
