import express from 'express';
import { GeminiController } from '../constrollers/GeminiController.js';

const router = express.Router();

router.post('/gemini-auto-description-maker',GeminiController)

export default router