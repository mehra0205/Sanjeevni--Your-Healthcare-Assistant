import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CalendarDays,
  Clock3,
  Users,
  CheckCircle2,
  Stethoscope,
  FileText,
  ArrowRight,
  Activity,
  XCircle,
} from "lucide-react";
import api from "../api";

export default function DoctorDashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("sanjeevni_user") || "null"
  );

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    fetchDoctorAppointments();
  }, []);

  const fetchDoctorAppointments = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/appointments/doctor");

      setAppointments(response.data || []);
    } catch (err) {
      console.error("Doctor appointments error:", err);

      setError(
        err.response?.data?.message ||
          "Could not load doctor appointments."
      );
    } finally {
      setLoading(false);
    }
  };

  const updateAppointmentStatus = async (
    appointmentId,
    status
  ) => {
    try {
      setUpdatingId(appointmentId);
      setError("");

      const response = await api.put(
        `/appointments/doctor/${appointmentId}/status`,
        {
          status,
        }
      );

      setAppointments((currentAppointments) =>
        currentAppointments.map((appointment) =>
          appointment._id === appointmentId
            ? response.data
            : appointment
        )
      );
    } catch (err) {
      console.error("Update appointment error:", err);

      setError(
        err.response?.data?.message ||
          "Could not update appointment."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const formatTime = (time) => {
    if (!time) return "Time not set";

    const [hours, minutes] = time.split(":");
    const hour = Number(hours);

    if (Number.isNaN(hour)) return time;

    const suffix = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;

    return `${formattedHour}:${minutes} ${suffix}`;
  };

  const formatDate = (date) => {
    if (!date) return "";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const today = new Date().toISOString().split("T")[0];

  const todayAppointments = appointments.filter(
    (appointment) => appointment.date === today
  );

  const completedAppointments = appointments.filter(
    (appointment) =>
      appointment.status?.toLowerCase() === "completed"
  );

  const upcomingAppointments = appointments.filter(
    (appointment) =>
      appointment.status?.toLowerCase() !== "cancelled" &&
      appointment.status?.toLowerCase() !== "completed"
  );

  const nextAppointment = upcomingAppointments[0];

  return (
    <div className="doctor-dashboard-page">

      {/* =====================================
          HEADER
      ===================================== */}

      <section className="doctor-dashboard-header">

        <div className="container">

          <div className="doctor-dashboard-welcome">

            <div>

              <span className="eyebrow">
                DOCTOR DASHBOARD
              </span>

              <h1>
                Good morning, {user?.name || "Doctor"}.
              </h1>

              <p>
                Here's your schedule and patient overview for today.
              </p>

            </div>

            <div className="doctor-status">

              <span className="doctor-status-dot"></span>

              Available for appointments

            </div>

          </div>

        </div>

      </section>


      {/* =====================================
          MAIN
      ===================================== */}

      <main className="container doctor-dashboard-content">

        {/* =================================
            STAT CARDS
        ================================= */}

        <div className="doctor-stat-grid">

          <div className="doctor-stat-card">

            <div className="doctor-stat-icon blue">
              <CalendarDays size={20} />
            </div>

            <div>

              <span>
                Today's Appointments
              </span>

              <strong>
                {todayAppointments.length}
              </strong>

              <small>
                Scheduled today
              </small>

            </div>

          </div>


          <div className="doctor-stat-card">

            <div className="doctor-stat-icon teal">
              <Users size={20} />
            </div>

            <div>

              <span>
                Patients
              </span>

              <strong>
                {appointments.length}
              </strong>

              <small>
                Total appointments
              </small>

            </div>

          </div>


          <div className="doctor-stat-card">

            <div className="doctor-stat-icon green">
              <CheckCircle2 size={20} />
            </div>

            <div>

              <span>
                Completed
              </span>

              <strong>
                {completedAppointments.length}
              </strong>

              <small>
                Completed appointments
              </small>

            </div>

          </div>


          <div className="doctor-stat-card">

            <div className="doctor-stat-icon purple">
              <Clock3 size={20} />
            </div>

            <div>

              <span>
                Next Appointment
              </span>

              <strong>
                {nextAppointment
                  ? formatTime(nextAppointment.time).split(" ")[0]
                  : "--"}
              </strong>

              <small>
                {nextAppointment
                  ? formatTime(nextAppointment.time)
                      .split(" ")
                      .slice(1)
                      .join(" ")
                  : "No upcoming appointment"}
              </small>

            </div>

          </div>

        </div>


        {/* =================================
            MAIN GRID
        ================================= */}

        <div className="doctor-dashboard-grid">


          {/* =================================
              APPOINTMENTS
          ================================= */}

          <section className="doctor-appointments-card">

            <div className="doctor-section-heading">

              <div>

                <span className="eyebrow">
                  APPOINTMENTS
                </span>

                <h2>
                  Upcoming appointments
                </h2>

              </div>

              <button
                className="doctor-view-button"
                onClick={() => navigate("/appointments")}
              >
                View all
                <ArrowRight size={14} />
              </button>

            </div>


            {/* Error message */}

            {error && (
              <div className="doctor-dashboard-error">
                {error}
              </div>
            )}


            <div className="doctor-appointment-list">

              {loading && (
                <p>
                  Loading appointments...
                </p>
              )}


              {!loading &&
                !error &&
                appointments.length === 0 && (
                  <p>
                    No appointments found.
                  </p>
                )}


              {!loading &&
                !error &&
                appointments.slice(0, 5).map(
                  (appointment) => {

                    const status =
                      appointment.status?.toLowerCase() ||
                      "booked";

                    const isUpdating =
                      updatingId === appointment._id;

                    return (
                      <div
                        className="doctor-appointment"
                        key={appointment._id}
                      >

                        {/* Patient */}

                        <div className="doctor-patient-avatar">

                          {appointment.patient?.name
                            ?.charAt(0)
                            ?.toUpperCase() || "P"}

                        </div>


                        <div className="doctor-patient-info">

                          <strong>
                            {appointment.patient?.name ||
                              "Patient"}
                          </strong>

                          <span>
                            {appointment.reason ||
                              "General Consultation"}
                          </span>

                        </div>


                        {/* Time + Date */}

                        <div className="doctor-appointment-time">

                          <Clock3 size={13} />

                          <div>
                            <span>
                              {formatTime(appointment.time)}
                            </span>

                            <small>
                              {formatDate(appointment.date)}
                            </small>
                          </div>

                        </div>


                        {/* Status */}

                        <span
                          className={`doctor-appointment-status ${status}`}
                        >
                          {appointment.status || "Booked"}
                        </span>


                        {/* Doctor Actions */}

                        {status === "booked" && (
                          <div className="doctor-appointment-actions">

                            <button
                              type="button"
                              className="doctor-complete-button"
                              disabled={isUpdating}
                              onClick={() =>
                                updateAppointmentStatus(
                                  appointment._id,
                                  "Completed"
                                )
                              }
                            >

                              <CheckCircle2 size={14} />

                              {isUpdating
                                ? "Updating..."
                                : "Complete"}

                            </button>


                            <button
                              type="button"
                              className="doctor-cancel-button"
                              disabled={isUpdating}
                              onClick={() =>
                                updateAppointmentStatus(
                                  appointment._id,
                                  "Cancelled"
                                )
                              }
                            >

                              <XCircle size={14} />

                              Cancel

                            </button>

                          </div>
                        )}

                      </div>
                    );
                  }
                )}

            </div>

          </section>


          {/* =================================
              PROFILE CARD
          ================================= */}

          <section className="doctor-profile-card">

            <div className="doctor-profile-icon">
              <Stethoscope size={25} />
            </div>

            <span className="eyebrow">
              YOUR PROFILE
            </span>

            <h2>
              Doctor workspace
            </h2>

            <p>
              Manage appointments, review patient information
              and keep your healthcare workflow organized.
            </p>

            <div className="doctor-profile-item">

              <Activity size={15} />

              <span>
                Patient consultations
              </span>

            </div>

            <div className="doctor-profile-item">

              <FileText size={15} />

              <span>
                Medical records
              </span>

            </div>

            <button
              className="doctor-profile-button"
              onClick={() => navigate("/appointments")}
            >
              Manage workspace
              <ArrowRight size={14} />
            </button>

          </section>

        </div>


        {/* =================================
            QUICK ACTIONS
        ================================= */}

        <section className="doctor-quick-section">

          <div className="doctor-section-heading">

            <div>

              <span className="eyebrow">
                QUICK ACTIONS
              </span>

              <h2>
                Common tasks
              </h2>

            </div>

          </div>


          <div className="doctor-quick-grid">

            <button
              className="doctor-quick-card"
              onClick={() => navigate("/appointments")}
            >

              <div className="doctor-quick-icon blue">
                <CalendarDays size={20} />
              </div>

              <div>

                <strong>
                  Manage appointments
                </strong>

                <span>
                  Review your schedule
                </span>

              </div>

              <ArrowRight size={15} />

            </button>


            <button
              className="doctor-quick-card"
              onClick={() => navigate("/doctors")}
            >

              <div className="doctor-quick-icon teal">
                <Users size={20} />
              </div>

              <div>

                <strong>
                  Doctor profile
                </strong>

                <span>
                  View doctor information
                </span>

              </div>

              <ArrowRight size={15} />

            </button>


            <button
              className="doctor-quick-card"
              onClick={() => navigate("/records")}
            >

              <div className="doctor-quick-icon purple">
                <FileText size={20} />
              </div>

              <div>

                <strong>
                  Medical records
                </strong>

                <span>
                  Review medical records
                </span>

              </div>

              <ArrowRight size={15} />

            </button>

          </div>

        </section>


        {/* =================================
            INFORMATION NOTE
        ================================= */}

        <div className="doctor-dashboard-note">

          <CheckCircle2 size={17} />

          <div>

            <strong>
              Live doctor workspace
            </strong>

            <p>
              Appointment information is now loaded from
              your Sanjeevni backend.
            </p>

          </div>

        </div>

      </main>

    </div>
  );
}