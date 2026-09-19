import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createBloodRequest, getMyBloodRequests } from "../controllers/bloodController.js";
const router = express.Router();
router.use(protect);
router.post("/", createBloodRequest);
router.get("/mine", getMyBloodRequests);
export default router;
