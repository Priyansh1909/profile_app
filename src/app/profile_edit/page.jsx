"use client"

import { data } from 'autoprefixer';
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

export default function Profile_edit() {


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

            document.getElementById('name_input').value = result.fullname || ''
            document.getElementById('email_input').value = result.email || ''
            document.getElementById('phone_input').value = result.phone || ''
            document.getElementById('about_input').value = result.about_user || ''
        })

    },[])

  





    const delete_skill = (index,e)=>{

        const temp_skill = [...skill]

        delete temp_skill[index]

        Setskill(temp_skill)
    }

    const delete_certificate = (index,e)=>{

        const temp_certificate = [...certification]

        delete temp_certificate[index]

        Setcertification(temp_certificate)
    }

    const delete_exp = (index,e)=>{

        const temp_exp = [...exp]

        delete temp_exp[index]

        Setexp(temp_exp)
    }

    const delete_edu = (index,e)=>{

        const temp_edu = [...edu]

        delete temp_edu[index]

        Setedu(temp_edu)
    }

    const add_skill = (e)=>{
        e.preventDefault()
        const value = document.getElementById('add_skill_input').value
        if(value == ''){
            return
        }

        Setskill([...skill,value])
        document.getElementById('add_skill_input').value = ''
    }

    const add_certificate = (e)=>{
        e.preventDefault()
        const certify = document.getElementById('certify_name').value
        const certify_from = document.getElementById('certify_from').value
        console.log(certify)
        console.log(certify_from)


        if (certify =='' || certify_from == ''){
            return
        }
        if (certification.length == 0){
            console.log("here")
            Setcertification([certify,certify_from])

        }

        Setcertification([...certification, [certify,certify_from]])
        document.getElementById('certify_from').value = ''
        document.getElementById('certify_name').value = ''
    }

    const  dateDiffInYearsAndMonths = (startdate, enddate) =>{
        const startDate = new Date(startdate);
        const endDate = new Date(enddate);
      
        let years = endDate.getFullYear() - startDate.getFullYear();
        let months = endDate.getMonth() - startDate.getMonth();
      
        if (months < 0) {
          years--;
          months += 12;
        }
      
        return { years, months };
      }

     
    const extractYearFromDate = (dateString)=> {
        const date = new Date(dateString);
        return date.getFullYear();
      }

    const saveChanges = async (e)=>{
        e.preventDefault()
        console.log("name :",name)
        console.log("email :",email)
        console.log("phone :",phone)
        console.log("about :",about)
        console.log("skill :",skill)
        console.log("certificate :",certification)
        console.log("experience :",exp)
        console.log("education :",edu)
        await axios.post('/api/save_user',{
            id:userid,
            name:name,
            email:email,
            phone:phone,
            about:about,
            skill:skill,
            certification:certification,
            exp:exp,
            edu,edu
        }).then((result)=>{
            console.log(result)
        })
    }

    const add_exp = (e)=>{
        e.preventDefault()
        const startdate = document.getElementById('start_date').value
        const enddate = document.getElementById('end_date').value
        const jobType = document.getElementById('job_type').value
        const company_name = document.getElementById('company_name').value
        const job_position = document.getElementById('job_position').value
        const time = dateDiffInYearsAndMonths(startdate,enddate)
        const startYear = extractYearFromDate(startdate)
        const endYear = extractYearFromDate(enddate)

        console.log(time)

        if (startdate == '' || enddate == '' || jobType == '' || company_name == '' ||job_position == ''){
            return
        }

        Setexp([...exp, [time,startYear,endYear,job_position,company_name,jobType]])

        document.getElementById('start_date').value = ''
        document.getElementById('end_date').value = ''
        document.getElementById('job_type').value = ''
        document.getElementById('company_name').value = ''
       document.getElementById('job_position').value = ''




    }

    const add_education = (e)=>{
        e.preventDefault()
        const edu_start_date = document.getElementById('edu_start_date').value
        const edu_end_date = document.getElementById('edu_end_date').value
        const college_name = document.getElementById('college_name').value
        const Degree = document.getElementById('Degree').value 
        const edu_Desc = document.getElementById('edu_Desc').value
        const edustartYear = extractYearFromDate(edu_start_date)
        const eduendYear = extractYearFromDate(edu_end_date)

        if (edu_start_date,edu_end_date,college_name,Degree,edu_Desc == ''){
            return
        }

        Setedu([...edu,[college_name,edustartYear,eduendYear,Degree,edu_Desc]])

    }


    return (
        <div className="bg-white w-full h-auto flex justify-center mt-10">
            <div className="border-2">

                <div className="text-center">User Profile Edit</div>
                <form>

                    <div className="mt-10">
                        image upload here
                    </div>
                    <div className="mt-10 flex">
                        <span className="w-32">Full Name : </span>
                        <input className="border-2  border-black border-opacity-40  w-60 rounded mr-2" onChange={(e)=>{Setname(e.target.value)}} id='name_input' />
                    </div>
                    <div className="mt-10 flex">
                        <span className="w-32">Email : </span>
                        <input className="border-2  border-black border-opacity-40  w-60 rounded mr-2" onChange={(e)=>{Setemail(e.target.value)}}  id='email_input'/>
                    </div>
                    <div className="mt-10 flex">
                        <span className="w-32">Phone No : </span>
                        <input className="border-2  border-black border-opacity-40  w-60 rounded mr-2" onChange={(e)=>{Setphone(e.target.value)}} placeholder='eg +919800000000'  id='phone_input'/>
                    </div>
                    <div className="mt-10 flex">
                        <span className="w-32">About Me : </span>
                        <div>
                            <textarea className="border-2 border-black border-opacity-40 rounded w-60 mr-2" rows={3} onChange={(e)=>{Setabout(e.target.value)}}  id='about_input'/>
                        </div>
                    </div>


                    <div id='skill'>
                            <div className='flex mt-10'>

                            <span className="w-32">Skills : </span>  <input className='w-52 border-2  border-black border-opacity-40  mr-2 my-1' id='add_skill_input' placeholder='@example - Nextjs'/> <button className='border-2 m-2' onClick={(e)=>(add_skill(e))} >Add</button>
                            </div>
                            <div className='flex m-2 ml-32 '>

                                <div id='skill_ul' className='grid grid-cols-3 gap-1'>
                                    {skill.map((s,index)=>{
                                        return( <div key={index} className='border-2 rounded-lg p-1'>
                                    
                                                <span>{s}</span>
                                                <button   onClick={(e)=>{e.target.parentElement.remove(); delete_skill(e)}} className='ml-2 text-xs text-gray-400'>X</button>
                                        
                                            </div>)
                                    })}
                                </div>
                            </div>
                    </div>

                    <div id='certification'>

                        <div  className=' mt-10'>
                            <div className='flex'>
                                <div className='w-32'>Certification : </div>
                                <div className='block'>
                                    <input className='w-52 border-2  border-black border-opacity-40  mr-2 my-1' id='certify_name' placeholder='eg - python'/>
                                    <br />
                                    <input className='w-52 border-2  border-black border-opacity-40  mr-2 my-1' id='certify_from' placeholder='eg from - Coding Ninja'/>
                                    <button className='border-2 m-2' onClick={(e)=>(add_certificate(e))} >Add</button>
                                </div>
                            </div>
                        
                            <div className='grid grid-cols-2 gap-2'>
                                    {certification.map((s,index)=>{
                                        // console.log(s)
                                        return( <div key={index} className='border-2 rounded-lg p-1 flex justify-between'>
                                            <div>
                                                <span><span className='font-bold'>{s[0]}</span> from {s[1]}</span>
                                            </div>
                                            <div>
                                                <button   onClick={(e)=>{e.target.parentElement.parentElement.remove(); delete_certificate(e)}} className='ml-2 text-xs text-gray-400'>X</button> 
                                            </div>
                                        
                                            </div>)
                                    })}
                            </div>
                        </div>

                    </div>

                    <div className='experience'>
                        <div className='mt-10'>
                            <div className='w-32'>Experience : </div>
                            <div className='flex'>
                            <div className='ml-3 w-32'>Company Name: </div>
                            <input  className='w-52 border-2  border-black border-opacity-40  mr-2 my-1' id='company_name'/>
                            </div>
                            <div  className='flex'>
                            <div className='ml-3 w-32'>Job Position: </div>
                            <input  className='w-52 border-2  border-black border-opacity-40  mr-2 my-1' id='job_position'/>
                            </div>
                            <div className='flex'>
                            <div className='ml-3 w-32'>Job Type: </div>
                            <select className='border-2' id='job_type'>
                                <option value='Full-Time'>Full-Time</option>
                                <option value='Part-Time'>Part-Time</option>
                                <option value='Intern'>Intern</option>
                                <option value='Freelancer'>Freelancer</option>
                            </select>
                            </div>
                            <div className='flex'>
                                <div className='ml-3 w-32'>Duration: </div>
                                        <div>
                                            <div className='m-2'>
                                                Start: <input type='date' id='start_date' className='border-2' placeholder='start date'/>
                                            </div>
                                            <div className='m-2'>
                                                End: <input type='date' className='border-2' id='end_date' />
                                            </div>
                                        </div>
                            </div>
                            <div className='flex justify-end m-2'> <button className='border-2 p-1' onClick={(e)=>{add_exp(e)}}>Add</button></div>
                        </div>

                        <div className='grid grid-cols-1 gap-2'>
                                    {exp.map((s,index)=>{
                                        // console.log(s)
                                        let yearstamp;
                                        let duration;

                                        if (s[0].years == 0){
                                            duration = <span>{s[0].months} Months</span>

                                        }
                                        else{
                                            duration = <span>{s[0].years} Years & {s[0].months} Months</span>
                                        }

                                        if(s[1]==s[2]){

                                            yearstamp = s[1]
                                        }
                                        else{
                                            yearstamp = <span>{s[1]}-{s[2]}</span>
                                        }
                                        return( <div key={index} className='border-2 rounded-lg p-1 justify-between'>
                                            <div>
                                                <span> Duration: {duration}</span>
                                            </div>
                                            <div>
                                               
                                                <span>  Year: {yearstamp}</span>
                                            </div> 
                                            <div>
                                                 <span> Postion: {s[3]}</span>
                                            </div>  <div>
                                                <span> Company Name: {s[4]}</span>
                                            </div>
                                            <div>
                                                <span> Job Type: {s[5]}</span>
                                            </div>
                                            <div className='flex justify-end'>
                                                <button   onClick={(e)=>{e.target.parentElement.parentElement.remove(); delete_exp(e)}} className='ml-2 text-xs text-gray-400'>X</button> 
                                            </div>
                                        
                                            </div>)
                                    })}
                            </div>





                    </div>

                    <div  className='education'>
                    <div className='mt-10'>
                            <div className='w-32'>Education : </div>
                            <div className='flex'>
                            <div className='ml-3 w-32'>College Name: </div>
                            <input  className='w-52 border-2  border-black border-opacity-40  mr-2 my-1' id='college_name'/>
                            </div>
                            <div  className='flex'>
                            <div className='ml-3 w-32'>Degree : </div>
                            <input  className='w-52 border-2  border-black border-opacity-40  mr-2 my-1' id='Degree'/>
                            </div>
                            <div className='flex'>
                                    <span className="ml-3 w-32 mt-2">Description : </span>
                                <div>
                                    <textarea className="border-2 border-black border-opacity-40 rounded w-60 mr-2 mt-2" rows={3} id='edu_Desc' />
                                </div>
                            </div>
                            <div className='flex'>
                                <div className='ml-3 w-32'>Duration: </div>
                                        <div>
                                            <div className='m-2'>
                                                Start: <input type='date' id='edu_start_date' className='border-2' placeholder='start date'/>
                                            </div>
                                            <div className='m-2'>
                                                End: <input type='date' className='border-2' id='edu_end_date' />
                                            </div>
                                        </div>
                            </div>
                            <div className='flex justify-end m-2'> <button className='border-2 p-1' onClick={(e)=>{add_education(e)}}>Add</button></div>
                        </div>
                        <div className='grid grid-cols-1 gap-2'>
                                    {edu.map((s,index)=>{
                                        // console.log(s)
                                        return( <div key={index} className='border-2 rounded-lg p-1 justify-between'>
                                            <div>
                                                <span> College Name: {s[0]}</span>
                                            </div>
                                            <div>
                                                 <span> Degree: {s[3]}</span>
                                            </div>  
                                            <div>
                                               
                                                <span>  Year: {s[1]}-{s[2]}</span>
                                            </div> 
                                            <div>
                                                <span> Description: {s[4]}</span>
                                            </div>
                                            <div className='flex justify-end'>
                                                <button   onClick={(e)=>{e.target.parentElement.parentElement.remove(); delete_edu(e)}} className='ml-2 text-xs text-gray-400'>X</button> 
                                            </div>
                                        
                                            </div>)
                                    })}
                            </div>



                    </div>

                    <button onClick={(e)=>{saveChanges(e)}} className='border-2 p-2'> Save Changes</button>
                </form>
            </div>
        </div>
    )
}