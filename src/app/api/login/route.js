const User = require('../../../models/userinfo')
import connect from "../../../DBconfig/DBconfig";
require('dotenv').config()
import { NextRequest,NextResponse } from "next/server";
import { SignJWT } from 'jose';
import bcrpyt from 'bcrypt'


 connect()




 export  async function POST(req){
    const reqBody = await req.json()

    const email = reqBody.Email
    const password = reqBody.password


    const user = await User.findOne({email})

    if(!user){
        return NextResponse.json({message : "Email does not exists",
        success: false})
    }

    const validatePassword = await bcrpyt.compare(password,user.password)

    if(!validatePassword){
        return NextResponse.json({message : "Invalid Password",
        success: false})
    }

    
    const token_data = {
        id : user._id,
        email: email,
    }



    const secret = new TextEncoder().encode(
        process.env.Token_secret,
      )

    const alg = 'HS256'

    const iat = Math.floor(Date.now() / 1000);

    const token = await new SignJWT(token_data)
    .setProtectedHeader({ alg, type: 'JWT' })
    .setIssuedAt(iat)
    .setExpirationTime('1d')
    .sign(secret);


    const response = NextResponse.json({
        message : "Login Successfully",
        success: true
    })

    response.cookies.set("Token",token,{
        httpOnly:true
    })


    return response

 }
