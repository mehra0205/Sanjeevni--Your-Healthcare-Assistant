import express from "express";
import { getDoctors, addDoctor } from "../controllers/doctorController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
const router = express.Router();
router.get("/", getDoctors);
router.post("/", protect, adminOnly, addDoctor);
export default router;
