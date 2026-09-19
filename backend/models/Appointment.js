import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  reason: String,
  status: { type: String, enum: ["Booked", "Completed", "Cancelled"], default: "Booked" }
}, { timestamps: true });

export default mongoose.model("Appointment", appointmentSchema);
