import Checkin from "../models/Checkin.js";

export const createCheckin = async (req, res) => {
  const checkin = await Checkin.create({ ...req.body, patient: req.user.id });
  res.status(201).json(checkin);
};

export const getMyCheckins = async (req, res) => {
  const checkins = await Checkin.find({ patient: req.user.id }).sort({ createdAt: -1 });
  res.json(checkins);
};
