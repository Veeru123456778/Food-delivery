import mongoose from 'mongoose';


//FOOD-APP project name by choice 
export const connectDb= async ()=>{
    mongoose.connect("mongodb+srv://varun:varun123@cluster0.kdtcp6c.mongodb.net/FOOD-APP").then(()=>console.log("Database connected successfully"));
}