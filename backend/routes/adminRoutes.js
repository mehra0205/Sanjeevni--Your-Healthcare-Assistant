import express from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import { getStats } from "../controllers/adminController.js";
const router = express.Router();
router.get("/stats", protect, adminOnly, getStats);
export default router;
