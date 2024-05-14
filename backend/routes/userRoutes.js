import express from 'express'
import {login_user,register_user} from '../controllers/userController.js'
import { addToCart, getCart, removeFromCart } from '../controllers/cartController.js';


const userRouter = express.Router();

userRouter.post("/login",login_user);
userRouter.post("/register",register_user);


export default  userRouter;