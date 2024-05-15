import express from 'express'
import multer from 'multer'
import { addFood, list_food, remove_food } from '../controllers/foodController.js'

import fs from 'fs';
import path from 'path';

const foodRouter = express.Router();

// Image storage engine
// const storage =multer.diskStorage({
// destination:"uploads",
// filename:(req,file,callback)=> {return callback(null,`${Date.now()}${file.originalname}`)}
// })

// Ensure /tmp/uploads directory exists
const uploadDir = path.join('/tmp', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Image storage engine
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, callback) => {
    callback(null, `${Date.now()}_${file.originalname}`);
  }
});

const upload=multer({storage:storage});

foodRouter.post('/add', upload.single('image'), (req, res, next) => {
  try {
    addFood(req, res, next);
  } catch (error) {
    res.status(500).json({ message: 'Error adding food', error: error.message });
  }
});
// foodRouter.post("/add",upload.single("image"),addFood)
foodRouter.get("/list",list_food);
foodRouter.delete("/remove",remove_food);

export default  foodRouter;   //setup in server.js file
