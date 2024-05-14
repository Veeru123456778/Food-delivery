import express from 'express';
import cors from 'cors';
import { connectDb } from './config/db.js';
import foodRouter from './routes/foodRoutes.js';
import userRouter from './routes/userRoutes.js'
import 'dotenv/config'   //for env randomsecret variable//
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoutes.js';

//app config

const app=express();
const port=5000;

//middlewares
app.use(cors({
origin:"https://food-delivery-frontend-psi.vercel.app",
methods:['GET','POST','PUT','DELETE'],
allowedHeaders:['Content-Type'],
}));
//we can access backend from any frontend
app.use(express.json()) //for parsing objects into json from frontend to backend


//db connection

connectDb();

//api endPoints
app.use("/api/food",foodRouter);
app.use("/images",express.static('uploads')); // we can access image using /images/filename
app.use("/api/user",userRouter);
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRouter);

app.get("/",(req,res)=>{
res.send("API is working");
})

app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
})

//
