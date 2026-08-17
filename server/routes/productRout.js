import express from 'express'
import { AddProduct, getBestSellingProducts, getProduct } from '../controllers/productController.js';
import upload from '../middleware/multer.js';

const router = express.Router();

const Productadd = router.post('/addproduct',upload.single("Image"),AddProduct)

const GetProduct = router.get('/getProducts',getProduct)


router.get("/best-sellers", getBestSellingProducts);

export default router
