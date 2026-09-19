import mongoose from "mongoose";

const ambulanceSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  location: String,
  emergencyType: String,
  phone: String,
  status: { type: String, default: "Requested" }
}, { timestamps: true });

export default mongoose.model("Ambulance", ambulanceSchema);
