import express from "express";
import multer from "multer";
import { protect } from "../middleware/authMiddleware.js";
import { getMyRecords, uploadRecord } from "../controllers/recordController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.use(protect);
router.get("/mine", getMyRecords);
router.post("/", upload.single("file"), uploadRecord);
export default router;
