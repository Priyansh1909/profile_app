require('dotenv').config()
const User = require('../../../models/userinfo')
const jose = require('jose')
import connect from "../../../DBconfig/DBconfig";
import { NextResponse } from "next/server";


connect()


export async function POST(req){

    const token = req.cookies.get('Token').value

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
    
     const currentUser = await User.findById(id)
     const currentConnection = currentUser.Connections

     
     
     
     const data = await req.json()

     
     currentConnection.push(data.connect)

    await User.findByIdAndUpdate(id,{
        Connections: currentConnection
    })

    return NextResponse.json({message:"User Edited Successfully"})

}