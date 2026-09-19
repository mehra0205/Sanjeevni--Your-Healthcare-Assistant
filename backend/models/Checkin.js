import mongoose from "mongoose";

const checkinSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  symptoms: String,
  emergency: { type: Boolean, default: false },
  notes: String,
  status: { type: String, default: "Waiting" }
}, { timestamps: true });

export default mongoose.model("Checkin", checkinSchema);
