import User from "../models/User.js";
import Appointment from "../models/Appointment.js";
import Ambulance from "../models/Ambulance.js";
import BloodRequest from "../models/BloodRequest.js";

export const getStats = async (req, res) => {
  const [users, appointments, ambulances, bloodRequests] = await Promise.all([
    User.countDocuments({ role: "patient" }),
    Appointment.countDocuments(),
    Ambulance.countDocuments({ status: "Requested" }),
    BloodRequest.countDocuments({ status: "Pending" })
  ]);

  res.json({ patients: users, appointments, ambulanceRequests: ambulances, bloodRequests });
};
