import express from "express";

import { protect } from "../middleware/authMiddleware.js";
import { getHospitalResources } from "../controllers/resourceController.js";

const router = express.Router();

router.use(protect);

router.get("/", getHospitalResources);

export default router;