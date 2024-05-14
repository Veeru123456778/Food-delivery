import express from 'express'
import multer from 'multer'
import { addFood, list_food, remove_food } from '../controllers/foodController.js'

const foodRouter = express.Router();

// Image storage engine
const storage =multer.diskStorage({
destination:"uploads",
filename:(req,file,callback)=> {return callback(null,`${Date.now()}${file.originalname}`)}
})

const upload=multer({storage:storage});

foodRouter.post("/add",upload.single("image"),addFood)
foodRouter.get("/list",list_food);
foodRouter.delete("/remove",remove_food);

export default  foodRouter;   //setup in server.js file