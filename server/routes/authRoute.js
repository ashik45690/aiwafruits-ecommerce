import express from 'express'
import { getCurrentUser, logout, Registercontroller, UserLogin } from '../controllers/authController.js'

const router = express.Router()

router.post('/user-register',Registercontroller);

router.post('/user-login',UserLogin)

router.get('/getCurrentUser',getCurrentUser)

router.post('/logout',logout)

export default router
