import express from "express";

import { protect } from "../middleware/authMiddleware.js";

import {
  createAppointment,
  getMyAppointments,
  cancelAppointment,
  getDoctorAppointments,
  updateDoctorAppointmentStatus,
} from "../controllers/appointmentController.js";

const router = express.Router();

router.use(protect);

// Patient routes
router.post("/", createAppointment);

router.get("/mine", getMyAppointments);

// Doctor routes
router.get("/doctor", getDoctorAppointments);

router.put("/doctor/:id/status", updateDoctorAppointmentStatus);

// Patient cancellation
router.put("/:id/cancel", cancelAppointment);

export default router;
