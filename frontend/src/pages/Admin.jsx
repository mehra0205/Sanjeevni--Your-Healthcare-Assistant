import { useEffect, useState } from "react";
import {
  Users,
  CalendarDays,
  Ambulance,
  Droplets,
  Activity,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";

import api from "../api";

export default function Admin() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);

  const loadStats = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError(false);

      const { data } = await api.get("/admin/stats");

      setStats(data);
    } catch (err) {
      console.error("Admin stats error:", err);
      setError(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const cards = [
    {
      title: "Patients",
      value: stats?.patients || 0,
      description: "Registered patients",
      icon: Users,
      type: "blue",
    },
    {
      title: "Appointments",
      value: stats?.appointments || 0,
      description: "Total appointments",
      icon: CalendarDays,
      type: "teal",
    },
    {
      title: "Ambulance Requests",
      value: stats?.ambulanceRequests || 0,
      description: "Emergency requests",
      icon: Ambulance,
      type: "red",
    },
    {
      title: "Blood Requests",
      value: stats?.bloodRequests || 0,
      description: "Blood requirements",
      icon: Droplets,
      type: "purple",
    },
  ];

  return (
    <div className="admin-dashboard-page">

      {/* =====================================
          HEADER
          ===================================== */}

      <section className="admin-dashboard-header">

        <div className="container">

          <div className="admin-header-content">

            <div>

              <span className="eyebrow">
                ADMIN DASHBOARD
              </span>

              <h1>
                Sanjeevni
                <span> overview.</span>
              </h1>

              <p>
                Monitor the platform's healthcare operations
                from one central dashboard.
              </p>

            </div>

            <button
              className="admin-refresh"
              onClick={() => loadStats(true)}
              disabled={refreshing}
            >
              <RefreshCw
                size={15}
                className={
                  refreshing ? "admin-refresh-spin" : ""
                }
              />

              {refreshing
                ? "Refreshing..."
                : "Refresh data"}
            </button>

          </div>

        </div>

      </section>


      {/* =====================================
          MAIN
          ===================================== */}

      <main className="container admin-dashboard-content">

        {/* Error */}

        {error && (

          <div className="admin-error">

            <Activity size={17} />

            <span>
              Could not load the latest dashboard statistics.
              Please try refreshing the data.
            </span>

          </div>

        )}


        {/* =================================
            STAT CARDS
            ================================= */}

        <div className="admin-stat-grid">

          {cards.map((card) => {

            const Icon = card.icon;

            return (

              <article
                className="admin-stat-card"
                key={card.title}
              >

                <div
                  className={`admin-stat-icon ${card.type}`}
                >
                  <Icon size={21} />
                </div>

                <div className="admin-stat-content">

                  <span>
                    {card.title}
                  </span>

                  <strong>
                    {loading ? "—" : card.value}
                  </strong>

                  <small>
                    {card.description}
                  </small>

                </div>

              </article>

            );
          })}

        </div>


        {/* =================================
            OVERVIEW
            ================================= */}

        <div className="admin-main-grid">

          <section className="admin-overview-card">

            <div className="admin-section-heading">

              <div>

                <span className="eyebrow">
                  PLATFORM ACTIVITY
                </span>

                <h2>
                  Healthcare operations
                </h2>

              </div>

              <div className="admin-live-status">

                <span></span>

                Live data

              </div>

            </div>


            <div className="admin-operation-list">

              {/* Patients */}

              <div className="admin-operation">

                <div className="admin-operation-icon blue">
                  <Users size={17} />
                </div>

                <div>

                  <strong>
                    Patient management
                  </strong>

                  <span>
                    Registered patients on the platform
                  </span>

                </div>

                <strong className="operation-value">
                  {loading ? "—" : stats?.patients || 0}
                </strong>

              </div>


              {/* Appointments */}

              <div className="admin-operation">

                <div className="admin-operation-icon teal">
                  <CalendarDays size={17} />
                </div>

                <div>

                  <strong>
                    Appointment management
                  </strong>

                  <span>
                    Appointments recorded by the system
                  </span>

                </div>

                <strong className="operation-value">
                  {loading
                    ? "—"
                    : stats?.appointments || 0}
                </strong>

              </div>


              {/* Ambulance */}

              <div className="admin-operation">

                <div className="admin-operation-icon red">
                  <Ambulance size={17} />
                </div>

                <div>

                  <strong>
                    Emergency support
                  </strong>

                  <span>
                    Ambulance requests submitted
                  </span>

                </div>

                <strong className="operation-value">
                  {loading
                    ? "—"
                    : stats?.ambulanceRequests || 0}
                </strong>

              </div>


              {/* Blood */}

              <div className="admin-operation">

                <div className="admin-operation-icon purple">
                  <Droplets size={17} />
                </div>

                <div>

                  <strong>
                    Blood bank
                  </strong>

                  <span>
                    Blood support requests submitted
                  </span>

                </div>

                <strong className="operation-value">
                  {loading
                    ? "—"
                    : stats?.bloodRequests || 0}
                </strong>

              </div>

            </div>

          </section>


          {/* =================================
              ADMIN INFO
              ================================= */}

          <section className="admin-info-card">

            <div className="admin-info-icon">
              <ShieldCheck size={25} />
            </div>

            <span className="eyebrow">
              ADMIN WORKSPACE
            </span>

            <h2>
              Platform control
            </h2>

            <p>
              Use the Sanjeevni administration area to
              monitor key healthcare workflows and system
              activity.
            </p>


            <div className="admin-info-item">

              <Activity size={15} />

              <span>
                Monitor platform activity
              </span>

            </div>


            <div className="admin-info-item">

              <Users size={15} />

              <span>
                Track patient registrations
              </span>

            </div>


            <div className="admin-info-item">

              <CalendarDays size={15} />

              <span>
                Review appointment activity
              </span>

            </div>

          </section>

        </div>


        {/* =================================
            NEXT STEPS
            ================================= */}

        <section className="admin-next-card">

          <div className="admin-next-icon">
            <Activity size={20} />
          </div>

          <div>

            <span className="eyebrow">
              PLATFORM ROADMAP
            </span>

            <h2>
              Expand the administration workflow
            </h2>

            <p>
              Hospital staff management, notifications,
              detailed analytics and additional operational
              controls can be integrated as the project grows.
            </p>

          </div>

        </section>


        {/* =================================
            FOOTER NOTE
            ================================= */}

        <div className="admin-footer-note">

          <ShieldCheck size={15} />

          <span>
            Administrative statistics are retrieved from
            the Sanjeevni backend.
          </span>

        </div>

      </main>

    </div>
  );
}