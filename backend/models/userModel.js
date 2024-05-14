import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    cartdetails: {type:Object,default:{}}
},{minimize:false})
//minimize false krna padega tabhi cart data create hoga agar empty bhi h cart data

const userModel = mongoose.model.user || mongoose.model("user",userSchema);


export default userModel;
