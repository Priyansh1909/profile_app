import { NextResponse } from "next/server";

export async function GET(){

    const response = NextResponse.json({
        message:"Logout Successfuly",
        sucess: true
    })

    response.cookies.set('Token','',{
        httpOnly:true
    })

    return response
}