import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req,res) =>{

  const frontendUrl = "http://localhost:5173";

try{
 const newOrder = new orderModel({
    userId:req.body.userId,
    items:req.body.items,
    amount:req.body.amount,
    address:req.body.address,
 })
 await newOrder.save();
 await userModel.findByIdAndUpdate(req.body.userId,{cartdetails:{}});    // when user placed the order then cart data will get cleared

 //logic for stripe payment link

 const line_items = req.body.items.map((item)=>({
    price_data:{
        currency:"inr",
        product_data:{
            name:item.name,
        },
      unit_amount:item.price*100*80
    },
      quantity:item.quantity
 }))

 //push delivery charges in this 

 line_items.push({
   price_data:{
      currency:"inr",
      product_data:{
        name:"Delivery Charges"
    },
    unit_amount:5*100*80
   },
   quantity:1
 })

 const session = await stripe.checkout.sessions.create({
    line_items:line_items,
    mode:'payment',
    success_url:`${frontendUrl}/verify?success=true&orderId=${newOrder._id}`,
    cancel_url:`${frontendUrl}/verify?success=false&orderId=${newOrder._id}`,
 })
 res.json({success:true,session_url:session.url});
}
catch(error){
    console.log(error);
    res.json({success:false,message:"Error"});
}
}

const verifyOrder = async (req,res) =>{
  const {success,orderId} = req.body;

  try{
if(success=="true"){
      await orderModel.findByIdAndUpdate(orderId,{payment:true});
      res.json({success:true,message:"Paid"});
}
else{
  await orderModel.findByIdAndDelete(orderId);
  res.json({success:false,message:"Not Paid"});
}
}
catch(error){
  console.log(error);
  res.json({success:false,message:"Error"});
}
}

// user orders for frontend
const userOrders = async(req,res)=>{
try{
 const orders = await orderModel.find({userId:req.body.userId});
 res.json({success:true,data:orders});
}catch(error){
  console.log(error);
  res.json({success:false,message:"Error"});
}
}

//listing orders for admin panel

const list_orders = async(req,res) => {
try{
  const allOrders = await orderModel.find({});
  res.json({success:true,data:allOrders});
}
catch(error){
  console.log(error);
  res.json({success:false,message:"Error"});
}}

//api for updating order status

const updateStatus= async(req,res)=>{
try{
   const {orderId,status} = req.body;
    await orderModel.findByIdAndUpdate(orderId,{status:status});
    res.json({success:true,message:"Status Updated"})
  }catch(error){
  console.log(error);
  res.json({success:false,message:"Error"});
}
}

export {placeOrder,verifyOrder,userOrders,list_orders,updateStatus}