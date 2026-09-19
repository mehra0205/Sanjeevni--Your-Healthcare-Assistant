import Appointment from "../models/Appointment.js";
import Doctor from "../models/Doctor.js";

export const createAppointment = async (req, res) => {
  try {
    const { doctor, date, time, reason } = req.body;

    const alreadyBooked = await Appointment.findOne({
      doctor,
      date,
      time,
      status: "Booked",
    });

    if (alreadyBooked) {
      return res.status(400).json({
        message: "This time slot is already booked.",
      });
    }

    const appointment = await Appointment.create({
      patient: req.user.id,
      doctor,
      date,
      time,
      reason,
    });

    const result = await appointment.populate("doctor");

    res.status(201).json(result);
  } catch {
    res.status(500).json({
      message: "Could not book appointment.",
    });
  }
};

export const getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      patient: req.user.id,
    })
      .populate("doctor")
      .sort({ date: 1 });

    res.json(appointments);
  } catch {
    res.status(500).json({
      message: "Could not fetch appointments.",
    });
  }
};

export const cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findOneAndUpdate(
      {
        _id: req.params.id,
        patient: req.user.id,
      },
      {
        status: "Cancelled",
      },
      {
        new: true,
      }
    );

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found.",
      });
    }

    res.json(appointment);
  } catch {
    res.status(500).json({
      message: "Could not cancel appointment.",
    });
  }
};

export const getDoctorAppointments = async (req, res) => {
  try {
    // Find the Doctor profile linked to the logged-in user
    const doctor = await Doctor.findOne({
      user: req.user.id,
    });

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor profile not found.",
      });
    }

    // Find appointments belonging to this doctor
    const appointments = await Appointment.find({
      doctor: doctor._id,
    })
      .populate("patient", "name email phone")
      .populate("doctor")
      .sort({ date: 1, time: 1 });

    res.json(appointments);
  } catch (error) {
    console.error("Doctor appointments error:", error);

    res.status(500).json({
      message: "Could not fetch doctor appointments.",
    });
  }
};

// Update appointment status from the doctor dashboard
export const updateDoctorAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;

    // Doctors can mark an appointment as Completed or Cancelled
    if (!["Completed", "Cancelled"].includes(status)) {
      return res.status(400).json({
        message: "Invalid appointment status.",
      });
    }

    // Find the Doctor profile linked to the logged-in user
    const doctor = await Doctor.findOne({
      user: req.user.id,
    });

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor profile not found.",
      });
    }

    // Update only an appointment belonging to this doctor
    const appointment = await Appointment.findOneAndUpdate(
      {
        _id: req.params.id,
        doctor: doctor._id,
      },
      {
        status,
      },
      {
        new: true,
      }
    )
      .populate("patient", "name email phone")
      .populate("doctor");

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found.",
      });
    }

    res.json(appointment);
  } catch (error) {
    console.error("Update doctor appointment error:", error);

    res.status(500).json({
      message: "Could not update appointment.",
    });
  }
};