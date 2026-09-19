import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Stethoscope,
  CalendarDays,
  Clock3,
  ArrowRight,
  CircleCheck,
} from "lucide-react";

import api from "../api";
import Message from "../components/Message";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [specialty, setSpecialty] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    api
      .get("/doctors")
      .then((res) => setDoctors(res.data))
      .catch(() => setMessage("Could not load doctors."));
  }, []);

  const filtered = doctors.filter((d) =>
    d.specialization
      .toLowerCase()
      .includes(specialty.toLowerCase())
  );

  return (
    <div className="doctors-page">

      {/* =================================
          PAGE HEADER
      ================================= */}

      <section className="doctors-header">

        <div className="container">

          <div className="doctors-header-content">

            <div>

              <span className="eyebrow">
                OUR DOCTORS
              </span>

              <h1>
                Find the right
                <span> doctor for you.</span>
              </h1>

              <p>
                Browse our available specialists and
                find the right healthcare professional
                for your needs.
              </p>

            </div>

            <div className="doctors-header-icon">
              <Stethoscope size={48} />
            </div>

          </div>

        </div>

      </section>


      {/* =================================
          DOCTORS CONTENT
      ================================= */}

      <main className="container doctors-content">

        {/* Search */}

        <div className="doctor-search-section">

          <div>

            <h2>Available Doctors</h2>

            <p>
              Search by specialty to find a doctor.
            </p>

          </div>

          <div className="doctor-search-box">

            <Search size={17} />

            <input
              type="text"
              placeholder="Search by specialty..."
              value={specialty}
              onChange={(e) =>
                setSpecialty(e.target.value)
              }
            />

          </div>

        </div>


        <Message
          text={message}
          error
        />


        {/* Results count */}

        {!message && (
          <div className="doctor-results-info">

            <span>
              {filtered.length} doctor
              {filtered.length !== 1 ? "s" : ""} found
            </span>

            {specialty && (
              <button
                onClick={() => setSpecialty("")}
                className="clear-search"
              >
                Clear search
              </button>
            )}

          </div>
        )}


        {/* Doctor Grid */}

        <div className="modern-doctor-grid">

          {filtered.map((doctor) => {

            const initial = doctor.name
              .split(" ")
              .slice(-1)[0][0]
              .toUpperCase();

            return (

              <article
                className="modern-doctor-card"
                key={doctor._id}
              >

                {/* Card Top */}

                <div className="doctor-card-top">

                  <div className="modern-doctor-avatar">
                    {initial}
                  </div>

                  <div
                    className={
                      doctor.available
                        ? "doctor-status available"
                        : "doctor-status unavailable"
                    }
                  >

                    <span></span>

                    {doctor.available
                      ? "Available"
                      : "Unavailable"}

                  </div>

                </div>


                {/* Doctor Details */}

                <div className="modern-doctor-details">

                  <h3>{doctor.name}</h3>

                  <div className="doctor-specialty">

                    <Stethoscope size={14} />

                    {doctor.specialization}

                  </div>

                  <p>
                    {doctor.about ||
                      "Experienced healthcare professional dedicated to providing quality patient care."}
                  </p>

                </div>


                {/* Meta */}

                <div className="modern-doctor-meta">

                  <div>

                    <Clock3 size={14} />

                    <span>
                      {doctor.experience} years experience
                    </span>

                  </div>

                  <div>

                    <strong>
                      ₹{doctor.fee}
                    </strong>

                    <span>
                      Consultation
                    </span>

                  </div>

                </div>


                {/* Action */}

                <Link
                  to="/appointments"
                  className="doctor-book-button"
                >

                  <CalendarDays size={16} />

                  Book Appointment

                  <ArrowRight size={15} />

                </Link>

              </article>

            );
          })}

        </div>


        {/* No results */}

        {filtered.length === 0 && !message && (

          <div className="no-doctors">

            <div>
              <Search size={24} />
            </div>

            <h3>
              No doctors found
            </h3>

            <p>
              Try searching for a different specialty.
            </p>

            <button
              onClick={() => setSpecialty("")}
              className="secondary-button"
            >
              Show all doctors
            </button>

          </div>

        )}


        {/* Information banner */}

        <section className="doctor-info-banner">

          <div className="doctor-info-icon">
            <CircleCheck size={24} />
          </div>

          <div>

            <strong>
              Need help choosing a doctor?
            </strong>

            <p>
              Browse doctors by their specialization
              and check their current availability.
            </p>

          </div>

        </section>

      </main>

    </div>
  );
}