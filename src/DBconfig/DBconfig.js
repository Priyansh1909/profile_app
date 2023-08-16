const mongoose = require('mongoose');
require('dotenv').config()

export default function connect(){
    try {
        mongoose.connect(process.env.MONGODB_URI)
        const connection = mongoose.connection;

        connection.on('connected',()=>{
            console.log("Connected to the database")
        })

        connection.on('error',()=>{
            console.log('MongoDb connection issue')
            process.exit()
        })
        
    } catch (error) {
        console.log(error)
        return
    }
}


