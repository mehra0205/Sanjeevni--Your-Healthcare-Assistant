import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createCheckin, getMyCheckins } from "../controllers/checkinController.js";
const router = express.Router();
router.use(protect);
router.post("/", createCheckin);
router.get("/mine", getMyCheckins);
export default router;
