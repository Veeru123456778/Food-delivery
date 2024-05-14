import mongoose from 'mongoose';


//FOOD-APP project name by choice 
export const connectDb= async ()=>{
    mongoose.connect(process.env.MONGO_URI).then(()=>console.log("Database connected successfully"));
}