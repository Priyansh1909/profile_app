require('dotenv').config()
const User = require('../../../models/userinfo')

import connect from "../../../DBconfig/DBconfig";
import { NextResponse } from "next/server";


connect()


export async function POST(req){

    
    const data = await req.json()


    try {

        await User.findByIdAndUpdate(data.id,{
            fullName :data.name,
        email : data.email,
        phone: data.phone,
        about_user : data.about,
        Skill: data.skill,
        Certification: data.certification,
        Experience: data.exp,
        Education: data.edu,
        })
    
        return NextResponse.json({message:"User Edited Successfully",success:true})
        
    } catch (error) {
        console.log(error)

        return NextResponse.json({message:"Error While Saving Please Try Again later" ,success:false})


        
    }


}