"use client"

import axios from 'axios'
import Image from 'next/image'
import { redirect, useRouter } from 'next/navigation'




export default function Sidebar(){
    const router = useRouter()


    const logout = async ()=>{

        await axios.get('/api/logout').then((data)=>{
            console.log(data)
            router.push('/')
        })
    }
    return(
        <div className='border-2 h-screen '>
            <div className='grid'>
                <div className=' mt-5 h-12 text-3xl flex pl-12'>
                    <span className=' px-8  border-2 rounded'>Dashboard</span>
                </div>


                    <div className='flex mt-8 pl-4'>
                        <Image  src="/chevronRight.svg" height={24} width={24} alt='rightarrow'/>
                        <button><span className='text-2xl px-8 py-2 ml-2 border-2 '  onClick={()=>{router.push('/profile')}} >My Profile</span></button>
                    </div>
                    <div className='flex mt-8 pl-4'>
                    <Image  src="/chevronRight.svg" height={24} width={24} alt='rightarrow'/>
                       <button> <span className='text-2xl px-8 py-2 ml-2 border-2 ' onClick={()=>{router.push('/connection')}}>My Connections</span></button>
                    </div>

                    <div> <button onClick={(e)=>{logout()}}>Logout</button></div>

            </div>
            <div className=''></div>
        </div>
    )
}