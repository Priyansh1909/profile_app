"use client"

import axios from 'axios'
import Image from 'next/image'
import { useState,useEffect } from 'react'


export default function Navbar({toggleSidebar,sidebarOpen}){

    const [name,setname] = useState('')

    useEffect(()=>{
        axios.get('/api/get_user',).then((data)=>{

            const result = data.data.data
            setname(result.fullname)
        })

    },[])

    const collapse = (e)=>{
        e.preventDefault()

        toggleSidebar(true)
        console.log("it is change",sidebarOpen)
    }


    return (
        <>
      
            <div className="w-full  flex justify-end pr-11 pl-11 pt-4 pb-4 h-24 border-b-2 bg-navbar_background">
          {/* <button onClick={(e)=>collapse(e)}>Heelo</button> */}
            <div className="w-80 h-14 flex gap-4">
                <div className=" py-2.5 gap-2.5">
                    <Image src="/Notification.png" className='item-center' width={28} height={28} alt='notifcation' />
                </div>
                <div className='px-2 py-2.5 flex gap-3 border border-gray-400 border-opacity-80 rounded bg-white'>
                    <div className='bg-profile_bg rounded'>
                        <Image  src="/image11.png" width={32} height={32} alt='profile_pic' />
                    </div>
                    <div className=' text-navbar_font justify-center w-40'>
                        <div className='text-xs'>Welcome back,</div>
                        <div className='text-base'>{name}</div>
                    </div>
                    <div>
                        <Image  src="/ArrowDown.png" width={32} height={32} alt='profile_pic' />                        
                    </div>
                    
                </div>
            </div>

        </div>
            

        </>
    )
}