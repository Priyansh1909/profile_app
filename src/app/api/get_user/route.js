const jwt = require('jsonwebtoken')
require('dotenv').config()
const User = require('../../../models/userinfo')
import connect from "../../../DBconfig/DBconfig";
import { NextResponse } from "next/server";


connect()


export async function GET(request){

    const token = request.cookies.get('Token').value

    console.log(token)
    let Email;
    let id;

    try {
        const decoded = jwt.verify(token,process.env.Token_secret)
        console.log(decoded)
        Email = decoded.Email
        id = decoded.id
        

    } catch (error) {
        console.log(error)
        return {messaage: "Invalid Token", status:false}
    }
    

    const user = await User.findById(id)
        console.log(user.fullName)


        const info ={fullname:user.fullName,
            email:user.email,
            phone:user.phone,
            about_user:user.about_user,
            Skill:user.Skill,
            Certification:user.Certification,
            Experience:user.Experience,
            Education:user.Education,
            userid:id
        }


        return NextResponse.json({data: info})



   



    
}