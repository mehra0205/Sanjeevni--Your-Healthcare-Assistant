import { Link } from "react-router-dom";
import {
  CalendarDays,
  Ambulance,
  Droplets,
  FileText,
  ClipboardCheck,
  Stethoscope,
  ArrowRight,
  Clock,
  HeartPulse,
} from "lucide-react";

import Sidebar from "../components/Sidebar";

const services = [
  {
    icon: CalendarDays,
    title: "Book Appointment",
    text: "Find doctors and book your appointment.",
    to: "/appointments",
    color: "blue",
  },
  {
    icon: Ambulance,
    title: "Emergency",
    text: "Request emergency assistance quickly.",
    to: "/ambulance",
    color: "red",
  },
  {
    icon: Droplets,
    title: "Blood Bank",
    text: "Find or request blood when needed.",
    to: "/blood-bank",
    color: "teal",
  },
  {
    icon: FileText,
    title: "Medical Records",
    text: "View and manage your health records.",
    to: "/records",
    color: "purple",
  },
];

export default function Dashboard() {
  const user = JSON.parse(
    localStorage.getItem("sanjeevni_user") || "null"
  );

  const firstName = user?.name?.split(" ")[0] || "Patient";

  return (
    <div className="dashboard-layout">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Dashboard */}
      <main className="dashboard-main">

        {/* Welcome Section */}
        <section className="dashboard-welcome">

          <div>
            <span className="dashboard-eyebrow">
              MY DASHBOARD
            </span>

            <h1>
              Hello, {firstName}! 👋
            </h1>

            <p>
              Take care of your health, because you are worth it.
            </p>
          </div>

          <div className="health-status">
            <HeartPulse size={20} />

            <div>
              <strong>Stay Healthy</strong>
              <span>Your health matters</span>
            </div>
          </div>

        </section>


        {/* Quick Services */}
        <section className="dashboard-section">

          <div className="section-heading">
            <div>
              <h2>Quick Services</h2>
              <p>Access important healthcare services</p>
            </div>
          </div>


          <div className="dashboard-services">

            {services.map((service) => {

              const Icon = service.icon;

              return (
                <Link
                  to={service.to}
                  className="dashboard-service-card"
                  key={service.title}
                >

                  <div
                    className={`dashboard-service-icon ${service.color}`}
                  >
                    <Icon size={23} />
                  </div>

                  <div className="dashboard-service-content">

                    <h3>{service.title}</h3>

                    <p>{service.text}</p>

                    <span className="service-link">
                      Open Service
                      <ArrowRight size={15} />
                    </span>

                  </div>

                </Link>
              );
            })}

          </div>

        </section>


        {/* Lower Dashboard */}
        <section className="dashboard-lower-grid">

          {/* Upcoming Appointment */}
          <div className="dashboard-panel">

            <div className="panel-header">

              <div>
                <h2>Upcoming Appointments</h2>
                <p>Your scheduled appointments</p>
              </div>

              <Link to="/appointments">
                View All
              </Link>

            </div>


            <div className="appointment-preview">

              <div className="doctor-avatar">
                <Stethoscope size={22} />
              </div>

              <div className="appointment-info">

                <h3>Manage Your Appointments</h3>

                <p>
                  Book an appointment with a doctor
                  according to your needs.
                </p>

                <div className="appointment-meta">
                  <span>
                    <Clock size={14} />
                    Flexible timing
                  </span>

                  <span className="appointment-status">
                    Available
                  </span>
                </div>

              </div>

              <Link
                to="/appointments"
                className="appointment-action"
              >
                Book
              </Link>

            </div>

          </div>


          {/* Check-In */}
          <div className="dashboard-panel checkin-panel">

            <div className="checkin-icon">
              <ClipboardCheck size={25} />
            </div>

            <div>
              <h2>Patient Self Check-In</h2>

              <p>
                Save time by checking in before
                your hospital visit.
              </p>

              <Link
                to="/checkin"
                className="primary-dashboard-button"
              >
                Check In
                <ArrowRight size={16} />
              </Link>
            </div>

          </div>

        </section>


        {/* Health Tips */}
        <section className="health-tip">

          <div className="health-tip-icon">
            <HeartPulse size={24} />
          </div>

          <div>
            <span>HEALTH TIP</span>

            <h3>
              Regular check-ups can help you stay
              ahead of potential health problems.
            </h3>

            <p>
              Take care of your health today for a
              healthier tomorrow.
            </p>
          </div>

        </section>

      </main>

    </div>
  );
}