import express from 'express';
import { CancelOrderController, GetAllOrdersController, GetSingleOrderController, MyordersController, OrdersController } from '../controllers/ordersController.js';
import { AuthMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/ordersdata',AuthMiddleware,OrdersController);

router.get("/get-all-orders", GetAllOrdersController);

router.get('/get-all-my-orders',AuthMiddleware,MyordersController)

router.get("/my-order/:id", AuthMiddleware, GetSingleOrderController);

router.get('/cancel-order/:id',CancelOrderController)

export default router
