import mongoose from "mongoose";

const bloodRequestSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  bloodGroup: String,
  units: Number,
  hospital: String,
  urgency: { type: String, enum: ["Normal", "Urgent", "Critical"], default: "Normal" },
  status: { type: String, default: "Pending" }
}, { timestamps: true });

export default mongoose.model("BloodRequest", bloodRequestSchema);
