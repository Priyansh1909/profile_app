"use client"

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'


export default function Profile_edit() {


  const router = useRouter()


  const [Alert, setAlert] = useState('')
  const [name, Setname] = useState('')
  const [email, Setemail] = useState('')
  const [phone, Setphone] = useState('')
  const [about, Setabout] = useState('')
  const [skill, Setskill] = useState([])
  const [certification, Setcertification] = useState([])
  const [exp, Setexp] = useState([])
  const [edu, Setedu] = useState([])
  const [userid, Setuserid] = useState([])



  useEffect(() => {

    axios.get('/api/get_user',).then((data) => {

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

      if (result.phone) {

        document.getElementById('phone_input').value = result.phone || ''
      }
      if (result.about_user) {

        document.getElementById('about_input').value = result.about_user || ''
      }
    })

  }, [])







  const delete_skill = (index, e) => {

    const temp_skill = [...skill]

    delete temp_skill[index]

    Setskill(temp_skill)
  }

  const delete_certificate = (index, e) => {

    const temp_certificate = [...certification]

    delete temp_certificate[index]

    Setcertification(temp_certificate)
  }

  const delete_exp = (index, e) => {

    const temp_exp = [...exp]

    delete temp_exp[index]

    Setexp(temp_exp)
  }

  const delete_edu = (index, e) => {

    const temp_edu = [...edu]

    delete temp_edu[index]

    Setedu(temp_edu)
  }

  const add_skill = (e) => {
    e.preventDefault()
    const value = document.getElementById('add_skill_input').value
    if (value == '') {
      return
    }

    Setskill([...skill, value])
    document.getElementById('add_skill_input').value = ''
  }

  const add_certificate = (e) => {
    e.preventDefault()
    const certify = document.getElementById('certify_name').value
    const certify_from = document.getElementById('certify_from').value


    if (certify == '' || certify_from == '') {
      return
    }
    if (certification.length == 0) {
      Setcertification([certify, certify_from])

    }

    Setcertification([...certification, [certify, certify_from]])
    document.getElementById('certify_from').value = ''
    document.getElementById('certify_name').value = ''
  }

  const dateDiffInYearsAndMonths = (startdate, enddate) => {
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


  const extractYearFromDate = (dateString) => {
    const date = new Date(dateString);
    return date.getFullYear();
  }

  const saveChanges = async (e) => {
    e.preventDefault()
    console.log("name :", name)
    console.log("email :", email)
    console.log("phone :", phone)
    console.log("about :", about)
    console.log("skill :", skill)
    console.log("certificate :", certification)
    console.log("experience :", exp)
    console.log("education :", edu)
    await axios.post('/api/save_user', {
      id: userid,
      name: name,
      email: email,
      phone: phone,
      about: about,
      skill: skill,
      certification: certification,
      exp: exp,
      edu, edu
    }).then((result) => {
      console.log(result)
      if (result.data.success == false) {
        setAlert(<div className="bg-red-700 text-white  mt-2 text-center rounded bg-opacity-70">
          {result.data.message}
        </div>)
        return
      }
      else if (result.data.success == true) {

        router.push('/profile')
      }
    })
  }

  const add_exp = (e) => {
    e.preventDefault()
    const startdate = document.getElementById('start_date').value
    const enddate = document.getElementById('end_date').value
    const jobType = document.getElementById('job_type').value
    const company_name = document.getElementById('company_name').value
    const job_position = document.getElementById('job_position').value
    const time = dateDiffInYearsAndMonths(startdate, enddate)
    const startYear = extractYearFromDate(startdate)
    const endYear = extractYearFromDate(enddate)


    if (startdate == '' || enddate == '' || jobType == '' || company_name == '' || job_position == '') {
      return
    }

    Setexp([...exp, [time, startYear, endYear, job_position, company_name, jobType]])

    document.getElementById('start_date').value = ''
    document.getElementById('end_date').value = ''
    document.getElementById('job_type').value = ''
    document.getElementById('company_name').value = ''
    document.getElementById('job_position').value = ''




  }

  const add_education = (e) => {
    e.preventDefault()
    const edu_start_date = document.getElementById('edu_start_date').value
    const edu_end_date = document.getElementById('edu_end_date').value
    const college_name = document.getElementById('college_name').value
    const Degree = document.getElementById('Degree').value
    const edu_Desc = document.getElementById('edu_Desc').value
    const edustartYear = extractYearFromDate(edu_start_date)
    const eduendYear = extractYearFromDate(edu_end_date)

    if (edu_start_date, edu_end_date, college_name, Degree, edu_Desc == '') {
      return
    }

    Setedu([...edu, [college_name, edustartYear, eduendYear, Degree, edu_Desc]])

  }


  return (
    <>




      <link rel="stylesheet" href="https://kit-pro.fontawesome.com/releases/v5.15.1/css/pro.min.css" />

      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-300">
        <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">


          <div className="mt-10">
            <form action="#">

              <div className='mb-4'>
              <button type="submit" className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in" onClick={(e) => { router.push('/profile') }}>
                Skip For Now
                </button>

              </div>


              <div className="flex flex-col mb-6">
                <label for="name" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Full Name</label>
                <div className="relative">
                  <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                  </div>

                  <input id='name_input' type="text" name="name" className="text-sm sm:text-base placeholder-gray-500 pl-4 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" onChange={(e) => { Setname(e.target.value) }} placeholder="Full Name" />
                </div>
              </div>



              <div className="flex flex-col mb-6">
                <label for="email" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">E-Mail Address:</label>
                <div className="relative">
                  <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                  </div>
                  <input onChange={(e) => { Setemail(e.target.value) }} id='email_input' type="email" name="email" className="text-sm sm:text-base placeholder-gray-500 pl-4 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" placeholder="E-Mail Address" />
                </div>
              </div>


              <div className="flex flex-col mb-6">
                <label for="PHONE" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Phone Number</label>
                <div className="relative">
                  <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                  </div>

                  <input type="text" id='phone_input' className="text-sm sm:text-base placeholder-gray-500 pl-4 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" onChange={(e) => { Setphone(e.target.value) }} placeholder="eg +919800000000" />
                </div>
              </div>



              <div className="flex flex-col mb-6">
                <label for="aboutUS" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">About Me :</label>
                <div className="relative">
                  <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                  </div>

                  <textarea type="text" id='about_input' rows={3} className="text-sm sm:text-base placeholder-gray-500 pl-4 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" onChange={(e) => { Setabout(e.target.value) }} />
                </div>
              </div>


              <div className="flex flex-col mb-6">
                <label for="skill" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Skills</label>
                <div className="relative">

                  <div className='flex'>

                    <input id='add_skill_input' type="text" name="name" className="text-sm sm:text-base placeholder-gray-500 pl-4 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" placeholder='@example - Nextjs' />
                    <button className='ml-4  rounded px-2  focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700' onClick={(e) => (add_skill(e))}>Add</button>
                  </div>
                  <div id='skill_ul' className='grid grid-cols-3 gap-3'>
                    {skill.map((s, index) => {
                      return (<div key={index} className='border-2 rounded-lg p-1 mt-2 flex justify-between rounded px-2  focus:outline-none  text-sm sm:text-base'>

                        <span className='overflow-scroll'>{s}</span>
                        <button onClick={(e) => { e.target.parentElement.remove(); delete_skill(e) }} className='ml-2 text-xs text-gray-400'>X</button>

                      </div>)
                    })}
                  </div>
                </div>
              </div>


              <div className="flex flex-col mb-6">
                <label for="certificate" className="mb-3 text-xs sm:text-sm tracking-wide text-gray-600">Certificate</label>
                <div className="relative ml-2">

                  <div className=' mb-2'>
                    <label for="course" className="mb-1  mt-2 mr-2 text-xs sm:text-sm tracking-wide text-gray-600">Course</label>
                    <input id='certify_name' type="text" className="text-sm sm:text-base placeholder-gray-500 pl-2 pr-2 rounded-lg border border-gray-400 w-full h-9  focus:outline-none focus:border-blue-400" placeholder='eg - python' />
                  </div>

                  <div className=' mb-2'>
                    <label for="from" className="mb-1  mt-2 mr-2 text-xs sm:text-sm tracking-wide text-gray-600">From</label>
                    <input id='certify_from' type="text" name="name" className="text-sm sm:text-base placeholder-gray-500 pl-2 pr-2 rounded-lg border border-gray-400 w-full h-9  focus:outline-none focus:border-blue-400" placeholder='eg from - Coding Ninja' />
                  </div>

                  <div className='flex justify-end'>

                    <button className='ml-4  rounded px-2 py-2  focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700' onClick={(e) => (add_certificate(e))}>Add</button>
                  </div>

                  <div className='grid grid-cols-2 gap-2'>
                    {certification.map((s, index) => {
                      return (<div key={index} className='border-2 rounded-lg p-1 flex justify-between rounded px-2  focus:outline-none  text-sm sm:text-base'>
                        <div>
                          <span><span className='font-bold'>{s[0]}</span> from {s[1]}</span>
                        </div>
                        <div>
                          <button onClick={(e) => { e.target.parentElement.parentElement.remove(); delete_certificate(e) }} className='ml-2 text-xs text-gray-400'>X</button>
                        </div>

                      </div>)
                    })}
                  </div>
                </div>
              </div>



              <div className="flex flex-col mb-6">
                <label for="Experience" className="mb-3 text-xs sm:text-sm tracking-wide text-gray-600">Experience:</label>
                <div className="relative ml-2">

                  <div className=' mb-2'>
                    <label for="companyName" className="mb-1  mt-2 mr-2 text-xs sm:text-sm tracking-wide text-gray-600">Company Name</label>
                    <input id='company_name' type="text" name="name" className="text-sm sm:text-base placeholder-gray-500 pl-2 pr-2 rounded-lg border border-gray-400 w-full h-9  focus:outline-none focus:border-blue-400" />
                  </div>

                  <div className=' mb-2'>
                    <label for="JobPosition" className="mb-1  mt-2 mr-2 text-xs sm:text-sm tracking-wide text-gray-600">Job Position</label>
                    <input id='job_position' type="text" name="name" className="text-sm sm:text-base placeholder-gray-500 pl-2 pr-2 rounded-lg border border-gray-400 w-full h-9  focus:outline-none focus:border-blue-400" />
                  </div>

                  <div className=' mb-2 flex'>
                    <label for="JobType" className="mb-1  mt-2 mr-2 text-xs sm:text-sm tracking-wide text-gray-600">Job Position</label>
                    <select className='text-sm sm:text-base placeholder-gray-500 pl-2 pr-2 rounded-lg border border-gray-400  h-9  focus:outline-none focus:border-blue-400' id='job_type' >
                      <option value='Full-Time'>Full-Time</option>
                      <option value='Part-Time'>Part-Time</option>
                      <option value='Intern'>Intern</option>
                      <option value='Freelancer'>Freelancer</option>
                    </select>
                  </div>

                  <div className=' mb-2'>
                    <label for="Duration" className="mb-2  mt-2 mr-2 text-xs sm:text-sm tracking-wide text-gray-600">Duration</label>

                    <div className="relative ml-2">

                      <div className=' mb-2'>
                        <label for="startexp" className="mb-1  mt-2 mr-2 text-xs sm:text-sm tracking-wide text-gray-600">Start:</label>
                        <input type='date' id='start_date' className='text-sm sm:text-base placeholder-gray-500 pl-2 pr-2 rounded-lg border border-gray-400  h-9  focus:outline-none focus:border-blue-400' placeholder='start date' />
                      </div>

                      <div className=' mb-2'>
                        <label for="endexp" className="mb-1  mt-2 mr-2 text-xs sm:text-sm tracking-wide text-gray-600">End:</label>
                        <input type='date' id='end_date' className='text-sm sm:text-base placeholder-gray-500 pl-2 pr-2 rounded-lg border border-gray-400  h-9  focus:outline-none focus:border-blue-400' placeholder='start date' />
                      </div>
                    </div>


                  </div>





                  <div className='flex justify-end'>

                    <button className='ml-4  rounded px-2 py-2  focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700' onClick={(e) => { add_exp(e) }}>Add</button>
                  </div>

                  <div className='grid grid-cols-1 gap-2'>
                    {exp.map((s, index) => {
                      let yearstamp;
                      let duration;

                      if (s[0].years == 0) {
                        duration = <span>{s[0].months} Months</span>

                      }
                      else {
                        duration = <span>{s[0].years} Years & {s[0].months} Months</span>
                      }

                      if (s[1] == s[2]) {

                        yearstamp = s[1]
                      }
                      else {
                        yearstamp = <span>{s[1]}-{s[2]}</span>
                      }
                      return (<div key={index} className='border-2 rounded-lg p-1 justify-between text-sm sm:text-base'>
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
                          <button onClick={(e) => { e.target.parentElement.parentElement.remove(); delete_exp(e) }} className='ml-2 text-xs text-gray-400'>X</button>
                        </div>

                      </div>)
                    })}
                  </div>
                </div>
              </div>


              <div className="flex flex-col mb-6">
                <label for="Education" className="mb-3 text-xs sm:text-sm tracking-wide text-gray-600">Education</label>
                <div className="relative ml-2">

                  <div className=' mb-2'>
                    <label for="collegename" className="mb-1  mt-2 mr-2 text-xs sm:text-sm tracking-wide text-gray-600">College Name</label>
                    <input id='college_name' type="text" name="name" className="text-sm sm:text-base placeholder-gray-500 pl-2 pr-2 rounded-lg border border-gray-400 w-full h-9  focus:outline-none focus:border-blue-400" />
                  </div>

                  <div className=' mb-2'>
                    <label for="degree" className="mb-1  mt-2 mr-2 text-xs sm:text-sm tracking-wide text-gray-600">Degree</label>
                    <input id='Degree' type="text" name="name" className="text-sm sm:text-base placeholder-gray-500 pl-2 pr-2 rounded-lg border border-gray-400 w-full h-9  focus:outline-none focus:border-blue-400" />
                  </div>

                  <div className=' mb-2'>
                    <label for="eduDesc" className="mb-1  mt-2 mr-2 text-xs sm:text-sm tracking-wide text-gray-600">Description</label>
                    <textarea id='edu_Desc' type="text" rows={3} className="text-sm sm:text-base placeholder-gray-500 pl-4 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" />
                  </div>


                  <div className=' mb-2'>
                    <label for="eduDuration" className="mb-2  mt-2 mr-2 text-xs sm:text-sm tracking-wide text-gray-600">Duration</label>

                    <div className="relative ml-2">

                      <div className=' mb-2'>
                        <label for="edustart" className="mb-1  mt-2 mr-2 text-xs sm:text-sm tracking-wide text-gray-600">Start:</label>
                        <input type='date' id='edu_start_date' className='text-sm sm:text-base placeholder-gray-500 pl-2 pr-2 rounded-lg border border-gray-400  h-9  focus:outline-none focus:border-blue-400' placeholder='start date' />
                      </div>

                      <div className=' mb-2'>
                        <label for="eduend" className="mb-1  mt-2 mr-2 text-xs sm:text-sm tracking-wide text-gray-600">End:</label>
                        <input type='date' id='edu_end_date' className='text-sm sm:text-base placeholder-gray-500 pl-2 pr-2 rounded-lg border border-gray-400  h-9  focus:outline-none focus:border-blue-400' placeholder='start date' />
                      </div>
                    </div>


                  </div>

                  <div className='flex justify-end'>

                    <button className='ml-4  rounded px-2 py-2  focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700' onClick={(e) => { add_education(e) }}>Add</button>
                  </div>

                  <div className='grid grid-cols-1 gap-2'>
                    {edu.map((s, index) => {
                      // console.log(s)
                      return (<div key={index} className='border-2 my-1 rounded-lg p-1 justify-between overflow-scroll'>
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
                          <button onClick={(e) => { e.target.parentElement.parentElement.remove(); delete_edu(e) }} className='ml-2 text-xs text-gray-400'>X</button>
                        </div>

                      </div>)
                    })}
                  </div>
                </div>
              </div>




              <div className="flex w-full">
                <button type="submit" className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in" onClick={(e) => { saveChanges(e) }}>
                  <span className="mr-2 uppercase">Save Info</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>

  )
}