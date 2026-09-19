import Ambulance from "../models/Ambulance.js";

export const requestAmbulance = async (req, res) => {
  const ambulance = await Ambulance.create({ ...req.body, patient: req.user.id });
  res.status(201).json(ambulance);
};

export const getMyAmbulances = async (req, res) => {
  const items = await Ambulance.find({ patient: req.user.id }).sort({ createdAt: -1 });
  res.json(items);
};
