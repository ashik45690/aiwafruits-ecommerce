import express from "express";
import { GeminiController } from "../constrollers/GeminiController.js";

const router = express.Router();

router.post("/gemini-auto-description-maker", (req, res) => {
  console.log("🔥 GEMINI ROUTE REACHED");
  console.log("Body:", req.body);

  res.json({
    success: true,
    message: "Gemini route is working",
  });
});

export default router;