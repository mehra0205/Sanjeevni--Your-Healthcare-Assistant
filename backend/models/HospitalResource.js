import mongoose from "mongoose";

const hospitalResourceSchema = new mongoose.Schema(
  {
    hospital: {
      type: String,
      required: true,
      default: "Sanjeevni Care Hospital",
    },

    icuBeds: {
      available: {
        type: Number,
        required: true,
        default: 12,
      },
      total: {
        type: Number,
        required: true,
        default: 20,
      },
    },

    generalBeds: {
      available: {
        type: Number,
        required: true,
        default: 38,
      },
      total: {
        type: Number,
        required: true,
        default: 60,
      },
    },

    ventilators: {
      available: {
        type: Number,
        required: true,
        default: 7,
      },
      total: {
        type: Number,
        required: true,
        default: 12,
      },
    },

    emergencyBeds: {
      available: {
        type: Number,
        required: true,
        default: 4,
      },
      total: {
        type: Number,
        required: true,
        default: 10,
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "HospitalResource",
  hospitalResourceSchema
);