import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    unique: true,
    sparse: true,
  },

  name: String,

  specialization: String,

  hospital: String,

  experience: Number,

  available: {
    type: Boolean,
    default: true,
  },

  availableDays: [String],

  fee: Number,

  about: String,
});

export default mongoose.model("Doctor", doctorSchema);
