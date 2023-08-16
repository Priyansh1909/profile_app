"use client"

import axios from "axios"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"


export default function Connection(){

    const router = useRouter()

    const [known,setknown] = useState([])
    const [unknown,setunknown] = useState([])
    const [connect,setconnect] = useState([])



    useEffect(()=>{
        const getinfo = async()=>{


            await axios.get('/api/get_connection').then((data)=>{
                
                console.log(data.data)
                setknown(data.data.known)
                setunknown(data.data.unknown)
                setconnect(data.data.Connect)
                
                
            })
        }

        getinfo()
    },[])

    const add_connection = async(e)=>{

        e.preventDefault()

        console.log(e.target.value)
        if (connect.length == 0){
            setconnect([e.target.value])
            

        }else{

            setconnect([...connect,e.target.value])
        }

        await axios.post('/api/add_connect',{
            connect : e.target.value
        }).then((data)=>{
            console.log(data)
          window.location.reload();
        })


    }



    return(
        <>
            <div className="">

            <div className="w-p96 border-2 h-32 ml-4 bg-profile_blue text-white rounded-xl  my-2 ">
                <div className="px-2 py-2">
                    My Connections
                    </div>
            </div>

            <div className="grid grid-cols-3 gap-10 m-6">

                {known.map((item)=>{
                         let Postion 
                         let company_name 
                        if (item.Experience.length == 0){
                             Postion = ''
                            company_name =  ''
                        }else{
                            Postion =  item.Experience[0][3] 
                            company_name = item.Experience[0][4]

                        }
                    return(

                        <div className="border-2 rounded-xl " key={item._id}>
                        <div className="flex">
                            <div className="m-4 text-xs">
                                <div className="font-medium ">{item.fullName}</div>
                                <div className="pt-4">{Postion}</div>
                                <div>{company_name}</div>
                                <div className="pt-6"><button className="bg-remove_connection rounded-2xl p-1">Remove Connection</button></div>
                            </div>
                            <div className="flex "><Image src="/profile_pic.png" className="justify-center" width={150} height={88}  alt="image"/></div>
                        </div>       
                    </div>

                    )
                })}
               

            </div>

            <div className="mt-40">
                <div className="ml-6">People You can also Connect</div>

                <div className="grid grid-cols-3 gap-10 m-6">
                {unknown.map((item)=>{

                    const exp =item.Experience
                 
                        let Postion;
                        let company_name; 
                        // 

                        if ( exp.length == 0){
                            Postion = ''
                           company_name =  ''
                       }else{
                           Postion =  item.Experience[0][3] 
                           company_name = item.Experience[0][4] 

                       }
                   
                    return(

                        <div className="border-2 rounded-xl "  key={item._id}>
                        <div className="flex">
                            <div className="m-4 text-xs">
                                <div className="font-medium ">{item.fullName}</div>
                                <div className="pt-4">{Postion}</div>
                                <div>{company_name}</div>
                                <div className="pt-6"><button className="bg-remove_connection rounded-2xl p-1" onClick={(e)=>{add_connection(e)}} value={item._id}>Connect</button></div>
                            </div>
                            <div className="flex "><Image src="/profile_pic.png" className="justify-center" width={150} height={88} alt="image" /></div>
                        </div>       
                    </div>

                    )
                })}
                
                </div>

                
            </div>



            </div>
        </>
    )
}