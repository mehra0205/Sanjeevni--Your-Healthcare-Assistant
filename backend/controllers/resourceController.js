import HospitalResource from "../models/HospitalResource.js";

export const getHospitalResources = async (req, res) => {
  try {
    let resources = await HospitalResource.findOne();

    // Create default resource data if none exists
    if (!resources) {
      resources = await HospitalResource.create({
        hospital: "Sanjeevni Care Hospital",

        icuBeds: {
          available: 12,
          total: 20,
        },

        generalBeds: {
          available: 38,
          total: 60,
        },

        ventilators: {
          available: 7,
          total: 12,
        },

        emergencyBeds: {
          available: 4,
          total: 10,
        },
      });
    }

    res.json(resources);
  } catch (error) {
    console.error("Hospital resources error:", error);

    res.status(500).json({
      message: "Could not fetch hospital resources.",
    });
  }
};