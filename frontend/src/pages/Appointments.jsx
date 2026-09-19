import { useEffect, useState } from "react";
import {
  CalendarDays,
  Clock3,
  Stethoscope,
  ClipboardList,
  XCircle,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

import api from "../api";
import Message from "../components/Message";

export default function Appointments() {
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const [form, setForm] = useState({
    doctor: "",
    date: "",
    time: "10:00",
    reason: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const load = async () => {
    const [d, a] = await Promise.all([
      api.get("/doctors"),
      api.get("/appointments/mine"),
    ]);

    setDoctors(d.data);
    setAppointments(a.data);
  };

  useEffect(() => {
    load().catch(() => {
      setError(true);
      setMessage("Could not load appointment data.");
    });
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/appointments", form);

      setError(false);
      setMessage("Appointment booked successfully.");

      setForm({
        doctor: "",
        date: "",
        time: "10:00",
        reason: "",
      });

      await load();
    } catch (err) {
      setError(true);
      setMessage(
        err.response?.data?.message ||
          "Could not book appointment."
      );
    }
  };

  const cancel = async (id) => {
    try {
      await api.put(`/appointments/${id}/cancel`);

      setError(false);
      setMessage("Appointment cancelled successfully.");

      await load();
    } catch (err) {
      setError(true);
      setMessage(
        err.response?.data?.message ||
          "Could not cancel appointment."
      );
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
    if (!date) return "Date not set";

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

  return (
    <div className="appointments-page">

      {/* =================================
          HEADER
          ================================= */}

      <section className="appointments-header">

        <div className="container">

          <div className="appointments-header-content">

            <div>

              <span className="eyebrow">
                APPOINTMENTS
              </span>

              <h1>
                Book your
                <span> next visit.</span>
              </h1>

              <p>
                Choose a doctor, select a convenient time,
                and manage your upcoming appointments.
              </p>

            </div>

            <div className="appointments-header-icon">
              <CalendarDays size={45} />
            </div>

          </div>

        </div>

      </section>


      {/* =================================
          MAIN CONTENT
          ================================= */}

      <main className="container appointments-content">

        <Message
          text={message}
          error={error}
        />

        <div className="appointments-layout">

          {/* =================================
              BOOKING FORM
              ================================= */}

          <section className="appointment-booking-card">

            <div className="appointment-card-heading">

              <div className="appointment-heading-icon">
                <CalendarDays size={20} />
              </div>

              <div>

                <h2>
                  New Appointment
                </h2>

                <p>
                  Fill in the details below to book your visit.
                </p>

              </div>

            </div>


            <form
              className="appointment-form"
              onSubmit={submit}
            >

              {/* Doctor */}

              <label>

                <span>
                  Choose Doctor
                </span>

                <div className="appointment-input">

                  <Stethoscope size={17} />

                  <select
                    required
                    value={form.doctor}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        doctor: e.target.value,
                      })
                    }
                  >

                    <option value="">
                      Select a doctor
                    </option>

                    {doctors.map((doctor) => (
                      <option
                        key={doctor._id}
                        value={doctor._id}
                      >
                        {doctor.name} —{" "}
                        {doctor.specialization}
                      </option>
                    ))}

                  </select>

                </div>

              </label>


              {/* Date */}

              <label>

                <span>
                  Appointment Date
                </span>

                <div className="appointment-input">

                  <CalendarDays size={17} />

                  <input
                    type="date"
                    required
                    min={
                      new Date()
                        .toISOString()
                        .split("T")[0]
                    }
                    value={form.date}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        date: e.target.value,
                      })
                    }
                  />

                </div>

              </label>


              {/* Time */}

              <label>

                <span>
                  Preferred Time
                </span>

                <div className="appointment-input">

                  <Clock3 size={17} />

                  <select
                    value={form.time}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        time: e.target.value,
                      })
                    }
                  >

                    {[
                      "09:00",
                      "10:00",
                      "11:00",
                      "12:00",
                      "15:00",
                      "16:00",
                      "17:00",
                    ].map((time) => (
                      <option
                        key={time}
                        value={time}
                      >
                        {formatTime(time)}
                      </option>
                    ))}

                  </select>

                </div>

              </label>


              {/* Reason */}

              <label>

                <span>
                  Reason for Visit
                </span>

                <div className="appointment-textarea">

                  <ClipboardList size={17} />

                  <textarea
                    placeholder="Briefly describe why you need the appointment..."
                    value={form.reason}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        reason: e.target.value,
                      })
                    }
                  />

                </div>

              </label>


              <button
                className="appointment-submit"
                type="submit"
              >

                Confirm Appointment

                <ArrowRight size={17} />

              </button>

            </form>


            <div className="appointment-note">

              <CheckCircle2 size={15} />

              <span>
                You can manage or cancel your appointment
                from this page.
              </span>

            </div>

          </section>


          {/* =================================
              APPOINTMENT LIST
              ================================= */}

          <section className="my-appointments-section">

            <div className="my-appointments-heading">

              <div>

                <h2>
                  Your Appointments
                </h2>

                <p>
                  Keep track of your scheduled visits.
                </p>

              </div>

              <div className="appointment-count">
                {appointments.length}
              </div>

            </div>


            {appointments.length === 0 ? (

              <div className="appointment-empty">

                <div className="appointment-empty-icon">
                  <CalendarDays size={25} />
                </div>

                <h3>
                  No appointments yet
                </h3>

                <p>
                  Your booked appointments will appear
                  here.
                </p>

              </div>

            ) : (

              <div className="appointment-list">

                {appointments.map((appointment) => {

                  const status =
                    appointment.status || "Booked";

                  const statusClass =
                    status.toLowerCase();

                  return (
                    <article
                      className="modern-appointment-card"
                      key={appointment._id}
                    >

                      {/* Top */}

                      <div className="modern-appointment-top">

                        <div className="appointment-doctor-icon">
                          <Stethoscope size={20} />
                        </div>

                        <div className="appointment-status-wrapper">

                          <span
                            className={`modern-appointment-status ${statusClass}`}
                          >
                            {status}
                          </span>

                        </div>

                      </div>


                      {/* Doctor */}

                      <h3>
                        {appointment.doctor?.name ||
                          "Doctor"}
                      </h3>

                      <span className="appointment-specialty">
                        {appointment.doctor?.specialization ||
                          "Healthcare Specialist"}
                      </span>


                      {/* Date + Time */}

                      <div className="appointment-details">

                        <div>

                          <CalendarDays size={14} />

                          <span>
                            {formatDate(appointment.date)}
                          </span>

                        </div>

                        <div>

                          <Clock3 size={14} />

                          <span>
                            {formatTime(appointment.time)}
                          </span>

                        </div>

                      </div>


                      {/* Reason */}

                      {appointment.reason && (

                        <div className="appointment-reason">

                          <span>
                            Reason
                          </span>

                          <p>
                            {appointment.reason}
                          </p>

                        </div>

                      )}


                      {/* Booked */}

                      {status === "Booked" && (

                        <button
                          type="button"
                          className="cancel-appointment"
                          onClick={() =>
                            cancel(appointment._id)
                          }
                        >

                          <XCircle size={15} />

                          Cancel Appointment

                        </button>

                      )}


                      {/* Completed */}

                      {status === "Completed" && (

                        <div className="appointment-completed-message">

                          <CheckCircle2 size={15} />

                          <span>
                            Appointment completed
                          </span>

                        </div>

                      )}


                      {/* Cancelled */}

                      {status === "Cancelled" && (

                        <div className="appointment-cancelled-message">

                          <XCircle size={15} />

                          <span>
                            This appointment was cancelled
                          </span>

                        </div>

                      )}

                    </article>
                  );
                })}

              </div>

            )}

          </section>

        </div>

      </main>

    </div>
  );
}