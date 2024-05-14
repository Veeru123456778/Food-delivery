//for the authentication of user using token when he adds product in cart 

import jwt from 'jsonwebtoken'


const authMiddleware = (req,res,next)=>{
const {token} = req.headers;

if(!token){
    res.json({success:false,message:"Not authorized Login again"});
}
try{
    const token_decode = jwt.verify(token,process.env.JWT_SECRET);
    req.body.userId = token_decode.id;
    next();
}
catch(error){
console.log(error);
res.json({success:false,message:"Error"});
}
}

export default authMiddleware;