import express from "express"
import { placeOrder, verifyOrder, userOrders, list_orders, updateStatus} from "../controllers/orderController.js";
import authMiddleware from "../middleware/auth.js";

const orderRouter = express.Router();

orderRouter.post("/place",authMiddleware,placeOrder);
orderRouter.post("/verify",verifyOrder);
orderRouter.post("/userOrders",authMiddleware,userOrders);
orderRouter.get("/list",list_orders);
orderRouter.post("/status",updateStatus);

export default orderRouter;