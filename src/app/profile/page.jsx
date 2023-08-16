"use client"

import axios from "axios"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState ,useEffect} from "react"


export default function Profile(){

    const router = useRouter()

    const [name,Setname] = useState('')
    const [email,Setemail] = useState('')
    const [phone,Setphone] = useState('')
    const [about,Setabout] = useState('')
    const [skill, Setskill] = useState([])
    const [certification, Setcertification] = useState([])
    const [exp, Setexp] = useState([])
    const [edu, Setedu] = useState([])
    const [userid, Setuserid] = useState([])


    useEffect(()=>{

        console.log("on load")
        axios.get('/api/get_user',).then((data)=>{

            const result = data.data.data
            Setname(result.fullname)
            Setemail(result.email)
            Setphone(result.phone)
            Setabout(result.about_user)
            Setskill(result.Skill)
            Setcertification(result.Certification || [])
            Setexp(result.Experience)
            Setedu(result.Education)
            Setuserid(result.userid)

            // document.getElementById('name_input').value = result.fullname || ''
            // document.getElementById('email_input').value = result.email || ''
            // document.getElementById('phone_input').value = result.phone || ''
            // document.getElementById('about_input').value = result.about_user || ''
        })

    },[])

    const edit = ()=>{

        console.log("edit clicks")

        router.push('/profile_edit')
    }


    return(
        <>
        <div className="flex">

            <div className="w-p96 border-2 h-48 bg-profile_blue text-white rounded-xl relative my-2 ">
                <div className="px-2 py-2">
                    My Profile
                    </div>
            </div>
            <div className="absolute mt-32 ml-12 w-rem59 bg-white border-2 rounded-xl grid lg:grid-cols-2 p-4 gap-10">
                <div className="grid gap-8">
                    <div className="flex justify-between">
                        <Image src="/profile_pic.png" height={88} width={88} />
                        <button className="self-center  bg-edit_button rounded-2xl p-2 text-xs"  onClick={(e)=>{edit(e)}}>Upload Link</button>
                    </div>
                    <div className="border-2 p-4 text-xs rounded-xl">
                        <div>
                            <div>
                                Your Name
                            </div>
                            <div className="flex justify-between mt-1">
                                <div className="pt-1">
                                    {name}
                                </div>
                                <button className="bg-edit_button rounded-2xl px-4 py-1" onClick={(e)=>{edit(e)}}>
                                    Edit
                                </button>     
                            </div>
                        </div>
                        <div className="mt-4">
                            <div>
                                Email
                            </div>
                            <div className="flex justify-between mt-1">
                                <div className="pt-1">
                                    {email}
                                </div>
                                <button className="bg-edit_button rounded-2xl px-4 py-1"  onClick={(e)=>{edit(e)}}>
                                    Edit
                                </button>     
                            </div>
                        </div>
                        <div className="mt-4">
                            <div>
                                Phone Number
                            </div>
                            <div className="flex justify-between mt-1">
                                <div className="pt-1">
                                    {phone}
                                </div>
                                <button className="bg-edit_button rounded-2xl px-4 py-1"  onClick={(e)=>{edit(e)}}>
                                    Edit
                                </button>     
                            </div>
                        </div>

                        
                    </div>

                    <div className="border-2 p-4 text-xs rounded-xl">
                        <div className="flex justify-between mt-1">
                                <div className="pt-1">
                                    About  
                                    <span className="text-text_color font-medium"> {name}</span>
                                </div>
                                <button className="bg-edit_button rounded-2xl px-4 py-1"  onClick={(e)=>{edit(e)}}>
                                    Edit
                                </button>     
                            </div>
                            <div className="mt-3">{about}</div>
                    
                    </div>
                    <div className="border-2 p-4 text-xs rounded-xl">
                        <div className="flex justify-between mt-1">
                                <div className="pt-1">
                                    Skills
                                </div>
                                <button className="bg-edit_button rounded-2xl px-4 py-1"  onClick={(e)=>{edit(e)}}>
                                    Edit
                                </button>     
                            </div>
                            <div className="mt-3 list-none">
                                {skill.map((item)=>{
                                    return (
                                        <li className="py-1" key={item}>{item}</li>
                                    )
                                })}
                            </div>        
                    </div>
                </div>
                <div className="2nd page">
                    <div className="border-2 p-4 text-xs rounded-xl">
                            <div className="flex justify-between mt-1">
                                <div>
                                    <div className="font-medium mb-4">Professional Details</div>
                                    <div>This are the professional detail show to <br/> users in the aapp</div>
                                </div>
                                <div>
                                    <Image  src="/Stars.png" height={68} width={68}/> 
                                </div>

                            </div>    
                     </div>

                     <div className=" p-4 text-xs">
                            <div className="flex justify-between mt-1">
                                <div className="pt-1">
                                    Certifications
                                </div>
                                <button className="bg-edit_button rounded-2xl px-4 py-1"  onClick={(e)=>{edit(e)}}>
                                    Edit
                                </button>     
                            </div>
                            {certification.map((item)=>{
                                return(
                                    <div className="p-3 border-2 rounded-3xl mt-3" key={1}>
                                    <div className="flex justify-between mt-1">
                                        <div><Image src='/Vector.png' height={30} width={30}/></div>
                                        <div className="mr-40">
                                            <div className="text-base font-medium">{item[0]}</div>
                                            <div>{item[1]}</div>
                                        </div>
                                    </div>
                                </div>

                                )
                            })}
                          
                     </div>

                     <div className=" p-4 text-xs">
                     <div className="flex justify-between mt-1">
                                <div className="pt-1">
                                    Experience
                                </div>
                                <button className="bg-edit_button rounded-2xl px-4 py-1"  onClick={(e)=>{edit(e)}}>
                                    Edit
                                </button>     
                        </div>
                        {exp.map((item)=>{

                                let yearstamp;
                                let duration;

                                if (item[0].years == 0){
                                    duration = <span>{item[0].months} Months</span>

                                }
                                else{
                                    duration = <span>{item[0].years} Years</span>
                                }

                                if(item[1]==item[2]){

                                    yearstamp = item[1]
                                }
                                else{
                                    yearstamp = <span>{item[1]}-{item[2]}</span>
                                }
                            
                                return(
                                    <div className="p-3 border-2 rounded-3xl mt-3" key={1}>
                                    <div className="flex justify-between mt-1">
                                        <div className="">
                                            <div className="flex justify-between mt-1">
                                                <div>{duration} ({yearstamp})</div>
                                                <div className="pl-16">{item[5]}</div>
                                            </div>
                                            <div className="flex justify-between mt-1">
                                                <div>{item[4]}</div>
                                                <div className="pl-16">--{item[3]}</div>
                                            </div>
                                        </div>
                                            <div><Image src='/company_name.png' height={60} width={60}/></div>     
                                    </div>
                                </div>

                                )

                            
                        })}
                       
{/* 
                        <div className="p-3 border-2 rounded-3xl mt-3">
                            <div className="flex justify-between mt-1">
                                <div className="">
                                    <div className="flex justify-between mt-1">
                                        <div>6 Months (2014)</div>
                                        <div className="pl-16">Intern</div>
                                    </div>
                                    <div className="flex justify-between mt-1">
                                        <div>Company Name</div>
                                        <div className="pl-16">--Full Stack Developer</div>
                                    </div>
                                </div>
                                    <div><Image src='/company_name.png' height={60} width={60}/></div>     
                            </div>
                        </div> */}
                     </div>

                     <div className="p-3 text-xs mt-3">
                        <div className="flex justify-between mt-1">
                                <div className="pt-1">
                                   Education
                                </div>
                                <button className="bg-edit_button rounded-2xl px-4 py-1"  onClick={(e)=>{edit(e)}}>
                                    Edit
                                </button>     
                        </div>
                        {edu.map((item)=>{

                            return(

                                <div  className="border-2 p-4  mt-3 text-xs rounded-lg" key={1}>
                            <div className="sm text-text_color font-medium">
                                {item[0]}
                            </div>
                            <div className="flex justify-between mt-3">
                                <div>({item[1]}-{item[2]})</div>
                                <div>{item[3]}</div>
                            </div>
                            <div>
                                {item[4]}
                            </div>

                        </div>


                            )
                        })}
                        
                     </div>

                </div>
                
            </div>
        </div>
        </>
    )
}