import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    fullName :String,
    email : String,
    password: String,
    phone: String,
    about_user : String,
    profile_pic: String,
    Skill: Array,
    Certification: Array,
    Experience: Array,
    Education: Array,
    Connections: Array
 })



 let users
try {
  users = mongoose.model('users')
} catch (error) {
  users = mongoose.model('users', userSchema)
}

module.exports =users

