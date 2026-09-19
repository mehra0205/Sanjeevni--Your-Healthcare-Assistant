import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { requestAmbulance, getMyAmbulances } from "../controllers/ambulanceController.js";
const router = express.Router();
router.use(protect);
router.post("/", requestAmbulance);
router.get("/mine", getMyAmbulances);
export default router;
