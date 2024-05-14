import userModel from '../models/userModel.js'

//we send token not id for cart items and using that token we are getting the id
//add item to user cart

const addToCart = async(req,res) =>{
try{
const id = req.body.userId;
let userData = await userModel.findOne({_id:id});
let cartdetails = userData.cartdetails;

if(!cartdetails[req.body.itemId]){
 cartdetails[req.body.itemId] = 1;
}
else{
    cartdetails[req.body.itemId]+=1;
}
await userModel.findByIdAndUpdate(id,{cartdetails});
res.json({success:true,message:"Added to cart"});
}
catch(error){
console.log(error);
res.json({success:false,message:"Error"});
}
}

//remove item from user cart

const removeFromCart = async (req, res) => {
    try {
        const id = req.body.userId;
        let userData = await userModel.findById(id);
        let cartdetails = await userData.cartdetails;

        if (cartdetails[req.body.itemId] <= 0) {
            return res.json({ success: false, message: "Item Not present in cart" });
        } else {
            cartdetails[req.body.itemId]--;
        }

        await userModel.findByIdAndUpdate(id, { cartdetails });
        res.json({ success: true, message: "Item removed from cart" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

//get the cart items

const getCart= async(req,res)=>{
try{
 const id=req.body.userId;
 let userData = await userModel.findById(id);
let cartdetails = await userData.cartdetails;
 if(!cartdetails){
    return res.json({success:false,message:"No Items present in cart"});
 }
 res.json({success:true,cartdetails});
}
catch(error){
    console.log(error);
    res.json({success:false,message:"Error"});
}
}

export {addToCart,removeFromCart,getCart};