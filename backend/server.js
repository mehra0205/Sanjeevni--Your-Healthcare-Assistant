import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/authRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import checkinRoutes from "./routes/checkinRoutes.js";
import ambulanceRoutes from "./routes/ambulanceRoutes.js";
import bloodRoutes from "./routes/bloodRoutes.js";
import recordRoutes from "./routes/recordRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import resourceRoutes from "./routes/resourceRoutes.js";

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  })
);

app.use(express.json());

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

// =====================================
// ROOT
// =====================================

app.get("/", (req, res) => {
  res.json({
    message: "Sanjeevni API is running",
  });
});

// =====================================
// API ROUTES
// =====================================

app.use("/api/auth", authRoutes);

app.use("/api/doctors", doctorRoutes);

app.use("/api/appointments", appointmentRoutes);

app.use("/api/checkins", checkinRoutes);

app.use("/api/ambulances", ambulanceRoutes);

app.use("/api/blood", bloodRoutes);

app.use("/api/records", recordRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/resources", resourceRoutes);

// =====================================
// ERROR HANDLER
// =====================================

app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    message: "Something went wrong on the server.",
  });
});

// =====================================
// DATABASE + SERVER
// =====================================

const PORT = process.env.PORT || 5000;

import mongoose from "mongoose";

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(
      "MongoDB connection failed:",
      error.message
    );
  });