require('dotenv').config()
const User = require('../../../models/userinfo')

import connect from "../../../DBconfig/DBconfig";
import { NextResponse } from "next/server";
const jwt = require('jsonwebtoken')



connect()


export async function POST(req){

    const token = req.cookies.get('Token').value

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

    
    const data = await req.json()
    console.log("senddata :",data)

    console.log(data.user)

    await User.findByIdAndUpdate(id,{
        Connections: data.user
    })

    return NextResponse.json({message:"User Edited Successfully"})

}