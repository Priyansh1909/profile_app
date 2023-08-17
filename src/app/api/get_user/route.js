const jose = require('jose')
require('dotenv').config()
const User = require('../../../models/userinfo')
import connect from "../../../DBconfig/DBconfig";
import { NextResponse } from "next/server";


connect()


export async function GET(request){
 

    let token
    if (request.cookies.get('Token')){

        token = request.cookies.get('Token').value 
    }


    let Email;
    let id;

    try {

        const secret = new TextEncoder().encode(
            process.env.Token_secret,
        );


        const { payload, protectedHeader } = await jose.compactVerify(token, secret)

          const decoded = JSON.parse(payload.toString());

          
        Email = decoded.email
        id = decoded.id
        

    } catch (error) {
        console.log(error)
        return {messaage: "Invalid Token", status:false}
    }
    

    const user = await User.findById(id)


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