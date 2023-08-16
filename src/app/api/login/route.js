const User = require('../../../models/userinfo')
import connect from "../../../DBconfig/DBconfig";
require('dotenv').config()
import { NextRequest,NextResponse } from "next/server";
import { SignJWT } from 'jose';
import bcrpyt from 'bcrypt'


 connect()




 export  async function POST(req){
    const reqBody = await req.json()
    console.log(reqBody)

    const email = reqBody.Email
    const password = reqBody.password


    const user = await User.findOne({email})

    if(!user){
        return NextResponse.json("Email does not exists")
    }

    const validatePassword = await bcrpyt.compare(password,user.password)

    if(!validatePassword){
        return NextResponse.json("Invalid Password")
    }

    
    const token_data = {
        id : user._id,
        email: email,
    }

    //const token = await SignJWT(token_data,process.env.Token_secret,{expiresIn:'1d'})


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

    console.log("WHAAT", typeof(token));

    const response = NextResponse.json({
        message : "Login Successfully",
        success: true
    })

    response.cookies.set("Token",token,{
        httpOnly:true
    })


    return response

 }
