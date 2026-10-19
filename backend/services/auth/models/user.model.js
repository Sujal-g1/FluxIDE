import mongoose, { Mongoose } from "mongoose";


const userSchema = new mongoose.Schema({
    firebaseUid:{
        type:String,
        required:true,
        unique: true,
        trim: true
    },
    name:{
        type:String,
         required:true,
         trim: true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        trim: true,
        lowercase: true
    },
    avatar:{
        type:String,
        default:""
    }
},{
    timestamps:true
})

const User = mongoose.model("User", userSchema)  
export default User