import express from 'express';
import { geminiController } from '../constrollers/GeminiController';


const router = express.Router();


router.post('/gemini-auto-description-maker', geminiController)


export default router