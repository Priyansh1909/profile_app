const User = require('../../../models/userinfo')
import connect from "../../../DBconfig/DBconfig";
import { NextRequest,NextResponse } from "next/server";
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
      return NextResponse.json({message:"User Already Exists"})
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
    console.log(saveduser)

    return NextResponse.json({message:"User Created Successfully"})




 }