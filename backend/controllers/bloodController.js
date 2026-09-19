import BloodRequest from "../models/BloodRequest.js";

export const createBloodRequest = async (req, res) => {
  const request = await BloodRequest.create({ ...req.body, patient: req.user.id });
  res.status(201).json(request);
};

export const getMyBloodRequests = async (req, res) => {
  const requests = await BloodRequest.find({ patient: req.user.id }).sort({ createdAt: -1 });
  res.json(requests);
};
