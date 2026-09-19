import MedicalRecord from "../models/MedicalRecord.js";

export const getMyRecords = async (req, res) => {
  const records = await MedicalRecord.find({ patient: req.user.id }).sort({ date: -1 });
  res.json(records);
};

export const uploadRecord = async (req, res) => {
  const record = await MedicalRecord.create({
    ...req.body,
    patient: req.user.id,
    fileName: req.file?.originalname,
    filePath: req.file?.path
  });
  res.status(201).json(record);
};
