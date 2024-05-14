import foodModel from "../models/foodModel.js";
import fs from 'fs';

//add food item

const addFood= async (req,res)=>{
 let image_filename= `${req.file.filename}`;
 
 const food=new foodModel({
    name:req.body.name,
    description: req.body.description,
    price:req.body.price,
    image:image_filename,
    category:req.body.category
 })
 try{
    await food.save();      // food product saved to database
   res.json({success:true,message:"Food Added"})
 }catch(error){
  console.log(error);
  res.json({success:false,message:"Error"})
 }
}

//list all food

const list_food = async (req,res)=>{
   try{
   const foods = await foodModel.find({});
   res.json({success:true,data:foods});
} catch(error){
   console.log(error);
   res.json({success:false,message:"Error"});
}
}


//remove food item

const remove_food = async (req,res)=>{
try{

   const id =req.body._id;
 const food= await foodModel.findById(id);

 if (!food) {
   return res.status(404).json({ success: false, message: "Food not found" });
}

 fs.unlink(`uploads/${food.image}`,()=>{})

 await foodModel.findByIdAndDelete(id);
res.json({success:true,message:"Food removed"});
}catch(error){
console.log(error);
res.json({success:false,message:"Error"});
}
}

export {addFood,list_food,remove_food};