const User = require('../../../models/userinfo')
import connect from "../../../DBconfig/DBconfig";
import { NextRequest,NextResponse } from "next/server";
require('dotenv').config()
import { SignJWT } from 'jose';

import bcrpyt from 'bcrypt'


 connect()




 export  async function POST(req){

    const reqBody = await req.json()
    console.log(reqBody)

    const email = reqBody.Email

    const name = reqBody.name
    console.log(name)


    const user = await User.findOne({email})


    //checking user already exists or not
    
    if (user){
      console.log(user)
      return NextResponse.json({message:"User Already Exists", success:false})
    }

    //hashing the password

    const salt = await bcrpyt.genSalt(10)
    const hashpassword = await bcrpyt.hash(reqBody.password, salt)

    console.log(hashpassword)

    const newuser = await new User({
         fullName:name,
         email:email,
         password: hashpassword
    })

    const saveduser = await newuser.save()

    console.log("add new user  is",saveduser)
    console.log("add new user id is",saveduser._id)

    const idToString = saveduser._id.toString()

    const token_data = {
      id : idToString,
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
      message : "User Created Successfully",
      success: true
  })

  response.cookies.set("Token",token,{
      httpOnly:true
  })


  return response


 }