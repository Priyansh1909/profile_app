"use client"

import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'




export default function Sidebar({ isOpen }) {
    const router = useRouter()


    const logout = async () => {

        await axios.get('/api/logout').then((data) => {
            console.log(data)
            router.push('/')
        })
    }

    return (

        isOpen ? <div className='h-screen sticky fixed text-xs xs:text-sm pr-4  '>
            <div>
                <div className=' mt-5 h-12 text-3xl flex pl-8 justify-center'>
                    <span className='text-2xl px-8 py-2 ml-2 border-2 rounded-lg text-sidebar_link text-xs xs:text-sm'>Dashboard</span>
                </div>


                <div className='grid lg:gap-rem36 xs:gap-96 grid-rows-1  '>

                    <div id='links' >
                        <div className='flex mt-8 pl-2'>
                            <Image src="/chevronRight.svg" height={24} width={24} alt='rightarrow' />
                            <button onClick={() => { router.push('/profile') }}><span className='text-2xl px-8 py-2 ml-2 border-2 rounded-lg text-sidebar_link text-xs xs:text-sm' >My Profile</span></button>
                        </div>
                        <div className='flex mt-8 pl-2'>
                            <Image src="/chevronRight.svg" height={24} width={24} alt='rightarrow' />
                            <button onClick={() => { router.push('/connection') }}> <span className='text-2xl px-4 py-2 ml-2 mr-2 border-2 rounded-lg text-sidebar_link text-xs xs:text-sm xs:w-40'>Connections</span></button>
                        </div>
                    </div>
                    <div className='flex justify-center mb-12'>
                        <button onClick={(e) => { logout() }}>
                            Log Out
                        </button>
                    </div>
                </div>

            </div>
            <div></div>
        </div> : <div>

        </div>

    )
}