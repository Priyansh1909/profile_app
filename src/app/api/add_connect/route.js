require('dotenv').config()
const User = require('../../../models/userinfo')
const jose = require('jose')
import connect from "../../../DBconfig/DBconfig";
import { NextResponse } from "next/server";


connect()


export async function POST(req){

    const token = req.cookies.get('Token').value

    console.log(token)
    let Email;
    let id;

    try {
        const secret = new TextEncoder().encode(
            process.env.Token_secret,
        );

        const claims = await jose.jwtVerify(token, secret, {
            issuer: 'urn:example:issuer',
            audience: 'urn:example:audience',
          })

          const decoded = claims.payload;

        //   const claims = jose.decodeJwt(token)
          
        console.log("PAYLOAD", decoded);
        // const decoded = jwt.jwtVerify(token,process.env.Token_secret)
        console.log(decoded)
        Email = decoded.email
        id = decoded.id
        

    } catch (error) {
        console.log(error)
        return {messaage: "Invalid Token", status:false}
    }
    
     const currentUser = await User.findById(id)
     const currentConnection = currentUser.Connections

     
     
     
     const data = await req.json()
     console.log("senddata :",data)
     
     currentConnection.push(data.connect)
     console.log(currentConnection)

    await User.findByIdAndUpdate(id,{
        Connections: currentConnection
    })

    return NextResponse.json({message:"User Edited Successfully"})

}