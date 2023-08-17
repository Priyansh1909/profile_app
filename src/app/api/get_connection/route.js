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

    if(!token) {
        return NextResponse.json({data: {}}) 
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
    

    const connections = await User.findById(id)

    const connection_id = connections.Connections


    const all_user = await User.find({},["_id","fullName","Experience"])

    

    let known_user = []
    let unknown_user = []


    for (let x in all_user){
        if (all_user[x]._id == id){
            
        }
        else if (connection_id.includes(all_user[x].id)){

            known_user.push(all_user[x])
        }
        else{
            unknown_user.push(all_user[x])
        }
    }







    


        return NextResponse.json({known:known_user,unknown:unknown_user,Connect:connections.Connections})



   



    
}