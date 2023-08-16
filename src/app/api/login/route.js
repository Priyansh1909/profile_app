const User = require('../../../models/userinfo')
import connect from "../../../DBconfig/DBconfig";
require('dotenv').config()
import { NextRequest,NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
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

    const token = await jwt.sign(token_data,process.env.Token_secret,{expiresIn:'1d'})

    const response = NextResponse.json({
        message : "Login Successfully",
        success: true
    })

    response.cookies.set("Token",token,{
        httpOnly:true
    })


    return response

 }
