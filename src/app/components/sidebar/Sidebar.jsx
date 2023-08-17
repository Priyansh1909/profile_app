"use client"

import axios from 'axios'
import Image from 'next/image'
import { redirect, useRouter } from 'next/navigation'




export default function Sidebar({isOpen}){
    const router = useRouter()


    const logout = async ()=>{

        await axios.get('/api/logout').then((data)=>{
            console.log(data)
            router.push('/')
        })
    }

    console.log("is open ", isOpen)
    return(
        <div className='object-left  border-2  h-screen'>
            <div>
                <div className=' mt-5 h-12 text-3xl flex pl-12 justify-center'>
                    <span className=' px-8  border-2 rounded-lg font-medium'>Dashboard</span>
                </div>
                
                
                <div className='grid gap-rem36 grid-rows-1'>

                    <div id='links' >
                        <div className='flex mt-8 pl-4'>
                                <Image  src="/chevronRight.svg" height={24} width={24} alt='rightarrow'/>
                                <button  onClick={()=>{router.push('/connection')}}><span className='text-2xl px-8 py-2 ml-2 border-2 rounded-lg text-sidebar_link' >My Profile</span></button>
                        </div>
                        <div className='flex mt-8 pl-4'>
                                <Image  src="/chevronRight.svg" height={24} width={24} alt='rightarrow'/>
                            <button onClick={()=>{router.push('/connection')}}> <span className='text-2xl px-8 py-2 ml-2 mr-2 border-2 rounded-lg text-sidebar_link'>My Connections</span></button>
                        </div>
                    </div>
                    <div className='flex justify-center mb-12'> 
                        <button onClick={(e)=>{logout()}}>
                            Log Out
                    </button>
                    </div>
                </div>

            </div>
            <div className=''></div>
        </div>
    )
}