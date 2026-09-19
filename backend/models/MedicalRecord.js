import mongoose from "mongoose";

const medicalRecordSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  doctorName: String,
  date: String,
  diagnosis: String,
  prescription: String,
  fileName: String,
  filePath: String
}, { timestamps: true });

export default mongoose.model("MedicalRecord", medicalRecordSchema);
