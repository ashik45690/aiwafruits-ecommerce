import express from "express";
import { geminiController } from "../controllers/geminiController.js";

const router = express.Router();

router.post(
  "/gemini-auto-description-maker",
  geminiController
);

export default router;
