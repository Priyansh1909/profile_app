const jwt = require('jose')
require('dotenv').config()


export default function Verify(token){


    let Email;

    try {
        const decoded = jwt.jwtVerify(token,process.env.Token_secret)
        console.log(decoded)
        Email = decoded.Email
        return {email:Email}
        

    } catch (error) {
        console.log(error)
        return {messaage: "Invalid Token", status:false}
    }

}