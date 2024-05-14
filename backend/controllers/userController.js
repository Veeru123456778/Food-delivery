import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'

//login user

const login_user= async (req,res)=>{

    const {email,password}=req.body;
    try{
        const userExist = await userModel.findOne({email});
    if(!userExist){
        res.json({success:false,message:"User doesn't exist"})
    }
   
    const isMatch = await bcrypt.compare(password,userExist.password);
    if(!isMatch){
        res.json({success:false,message:"Invalid Credentials"})
    }

    const token =createToken(userExist._id);

    res.json({success:true,token});

}
    catch(error){
        console.log(error);
     res.json({success:false,message:"Error"});
    }
}

const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET);
} 

//Register user

const register_user = async (req,res)=>{

  const {name,email,password}= req.body;

try{

    //checking if user already exist or not

    const exist = await userModel.findOne({email:email});
    if(exist){
        return res.json({success:false,message:"User already exist"});
    }

    if(!validator.isEmail(email)){
        return res.json({success:false,message:"Please Enter a Valid email"});
    }
    if(password.length<8){
        return res.json({success:false,message:"Please Enter a strong Password"});  
    }

    //hashing user's password

    const salt = await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash(password,salt);

    const newUser = new userModel({
        name:name,
        email:email,
        password:hashed_password
    })
    
    try{
    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({success:true,token})
}
catch(error){
console.log(error);
res.json({success:false,message:"Error"});
}
}
catch(error){

}
}

export {login_user,register_user};
