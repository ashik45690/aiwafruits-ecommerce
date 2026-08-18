import express from 'express'
import { getCurrentUser, logout, Registercontroller, resetPassword, SendForgottPasswordOTP, UserLogin, verifyForgotPasswordOTP } from '../controllers/authController.js'

const router = express.Router()

router.post('/user-register',Registercontroller);

router.post('/user-login',UserLogin)

router.get('/getCurrentUser',getCurrentUser)

router.post('/logout',logout)



router.post("/forgot-password/send-otp", SendForgottPasswordOTP);

router.post("/forgot-password/verify-otp", verifyForgotPasswordOTP);

router.post("/forgot-password/reset", resetPassword);

export default router
