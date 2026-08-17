import express from 'express';
import { addToCartController, getCartController, removeController, updateCartQuantity } from '../controllers/cartController.js';
import { AuthMiddleware } from '../middleware/authMiddleware.js';


const router = express.Router()


router.post('/addToCart', AuthMiddleware,addToCartController);
router.get('/getCartdata',AuthMiddleware,getCartController);
router.delete('/removeCartItem/:productId',AuthMiddleware,removeController)
router.patch("/quantity/:productId", AuthMiddleware, updateCartQuantity);


export default router
