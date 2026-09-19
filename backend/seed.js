import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/User.js";
import Doctor from "./models/Doctor.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

await User.deleteMany({});
await Doctor.deleteMany({});

const password = await bcrypt.hash("Patient@123", 10);
const doctorPassword = await bcrypt.hash("Doctor@123", 10);
const adminPassword = await bcrypt.hash("Admin@123", 10);

// Create users first
const patient = await User.create({
  name: "Demo Patient",
  email: "patient@sanjeevni.com",
  password,
  role: "patient",
  phone: "9876543210",
});

const doctorUser = await User.create({
  name: "Dr. Aditi Sharma",
  email: "doctor@sanjeevni.com",
  password: doctorPassword,
  role: "doctor",
});

const admin = await User.create({
  name: "Sanjeevni Admin",
  email: "admin@sanjeevni.com",
  password: adminPassword,
  role: "admin",
});

// Create doctor profile linked to doctor user
await Doctor.create({
  user: doctorUser._id,
  name: "Dr. Aditi Sharma",
  specialization: "General Physician",
  hospital: "Sanjeevni Care Hospital",
  experience: 8,
  available: true,
  availableDays: ["Monday", "Tuesday", "Thursday"],
  fee: 500,
  about:
    "Primary care doctor focused on everyday health and preventive care.",
});

await Doctor.create({
  name: "Dr. Rahul Verma",
  specialization: "Cardiologist",
  hospital: "City Heart Centre",
  experience: 12,
  available: true,
  availableDays: ["Monday", "Wednesday", "Friday"],
  fee: 900,
  about:
    "Specialist in heart health, blood pressure and cardiac follow-ups.",
});

await Doctor.create({
  name: "Dr. Neha Kapoor",
  specialization: "Pediatrician",
  hospital: "Little Steps Hospital",
  experience: 7,
  available: false,
  availableDays: ["Tuesday", "Thursday", "Saturday"],
  fee: 650,
  about:
    "Child healthcare and routine pediatric consultations.",
});

await Doctor.create({
  name: "Dr. Arjun Mehta",
  specialization: "Orthopedic",
  hospital: "Sanjeevni Care Hospital",
  experience: 10,
  available: true,
  availableDays: ["Wednesday", "Friday", "Saturday"],
  fee: 700,
  about:
    "Bone, joint and muscle care with a focus on practical recovery plans.",
});

console.log("Seed completed.");
process.exit();

