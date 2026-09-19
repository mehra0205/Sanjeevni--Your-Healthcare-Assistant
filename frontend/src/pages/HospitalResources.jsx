import { useEffect, useState } from "react";
import {
  BedDouble,
  Wind,
  Activity,
  Building2,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

import api from "../api";

export default function HospitalResources() {
  const [resourceData, setResourceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const loadResources = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const { data } = await api.get("/resources");

      setResourceData(data);
    } catch (err) {
      console.error("Hospital resources error:", err);

      setError(
        err.response?.data?.message ||
          "Could not load hospital resources."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadResources();
  }, []);

  const resources = resourceData
    ? [
        {
          title: "ICU Beds",
          value: resourceData.icuBeds?.available || 0,
          total: resourceData.icuBeds?.total || 0,
          icon: BedDouble,
          type: "icu",
        },
        {
          title: "General Beds",
          value: resourceData.generalBeds?.available || 0,
          total: resourceData.generalBeds?.total || 0,
          icon: BedDouble,
          type: "general",
        },
        {
          title: "Ventilators",
          value: resourceData.ventilators?.available || 0,
          total: resourceData.ventilators?.total || 0,
          icon: Wind,
          type: "ventilator",
        },
        {
          title: "Emergency Beds",
          value: resourceData.emergencyBeds?.available || 0,
          total: resourceData.emergencyBeds?.total || 0,
          icon: Activity,
          type: "emergency",
        },
      ]
    : [];

  const totalBeds =
    (resourceData?.icuBeds?.available || 0) +
    (resourceData?.generalBeds?.available || 0) +
    (resourceData?.emergencyBeds?.available || 0);

  return (
    <div className="resources-page">

      {/* =====================================
          HEADER
          ===================================== */}

      <section className="resources-header">

        <div className="container resources-header-content">

          <div>

            <span className="eyebrow">
              HOSPITAL RESOURCES
            </span>

            <h1>
              Check hospital
              <span> availability.</span>
            </h1>

            <p>
              View the current availability of important
              hospital resources before your visit.
            </p>

          </div>

          <div className="resources-header-icon">
            <Building2 size={45} />
          </div>

        </div>

      </section>


      {/* =====================================
          MAIN CONTENT
          ===================================== */}

      <main className="container resources-content">

        {/* Error */}

        {error && (

          <div className="resources-error">

            <AlertCircle size={17} />

            <span>
              {error}
            </span>

          </div>

        )}


        {/* Status banner */}

        <div className="resources-status-banner">

          <div className="resources-status-icon">
            <CheckCircle2 size={20} />
          </div>

          <div>

            <strong>
              {loading
                ? "Loading resource availability..."
                : "Resources currently available"}
            </strong>

            <p>
              {loading
                ? "Fetching the latest hospital resource information."
                : `${resourceData?.hospital || "Sanjeevni Care Hospital"} resource availability is shown below.`}
            </p>

          </div>

          <button
            className="resources-refresh"
            onClick={() => loadResources(true)}
            disabled={refreshing}
          >

            <RefreshCw
              size={14}
              className={
                refreshing
                  ? "resources-refresh-spin"
                  : ""
              }
            />

            {refreshing
              ? "Refreshing..."
              : "Refresh"}

          </button>

        </div>


        {/* =================================
            RESOURCE CARDS
            ================================= */}

        <div className="resources-grid">

          {loading ? (

            <div className="resources-loading">
              Loading hospital resources...
            </div>

          ) : (

            resources.map((resource) => {

              const Icon = resource.icon;

              const percentage =
                resource.total > 0
                  ? Math.round(
                      (resource.value /
                        resource.total) *
                        100
                    )
                  : 0;

              const available =
                resource.value > 0;

              return (

                <article
                  className={`resource-card ${resource.type}`}
                  key={resource.title}
                >

                  <div className="resource-card-top">

                    <div className="resource-icon">
                      <Icon size={22} />
                    </div>

                    <span
                      className={
                        available
                          ? "resource-available"
                          : "resource-unavailable"
                      }
                    >

                      <span></span>

                      {available
                        ? "Available"
                        : "Unavailable"}

                    </span>

                  </div>


                  <h2>
                    {resource.title}
                  </h2>


                  <div className="resource-number">

                    <strong>
                      {resource.value}
                    </strong>

                    <span>
                      / {resource.total}
                    </span>

                  </div>


                  <p className="resource-description">

                    {resource.value} units currently
                    available out of {resource.total}.

                  </p>


                  {/* Progress */}

                  <div className="resource-progress">

                    <div
                      style={{
                        width: `${percentage}%`,
                      }}
                    ></div>

                  </div>


                  <div className="resource-footer">

                    <span>
                      {percentage}% available
                    </span>

                    <span>
                      Updated recently
                    </span>

                  </div>

                </article>

              );
            })

          )}

        </div>


        {/* =================================
            RESOURCE OVERVIEW
            ================================= */}

        <section className="resources-overview">

          <div className="resources-overview-heading">

            <div>

              <span className="eyebrow">
                RESOURCE OVERVIEW
              </span>

              <h2>
                Hospital capacity at a glance
              </h2>

            </div>

          </div>


          <div className="overview-grid">

            <div className="overview-item">

              <div className="overview-item-icon">
                <BedDouble size={18} />
              </div>

              <div>

                <strong>
                  {loading ? "—" : totalBeds}
                </strong>

                <span>
                  Beds available
                </span>

              </div>

            </div>


            <div className="overview-item">

              <div className="overview-item-icon">
                <Wind size={18} />
              </div>

              <div>

                <strong>
                  {loading
                    ? "—"
                    : resourceData?.ventilators
                        ?.available || 0}
                </strong>

                <span>
                  Ventilators available
                </span>

              </div>

            </div>


            <div className="overview-item">

              <div className="overview-item-icon">
                <Activity size={18} />
              </div>

              <div>

                <strong>
                  {loading
                    ? "—"
                    : resourceData?.emergencyBeds
                        ?.available || 0}
                </strong>

                <span>
                  Emergency beds
                </span>

              </div>

            </div>


            <div className="overview-item">

              <div className="overview-item-icon">
                <Building2 size={18} />
              </div>

              <div>

                <strong>
                  {loading ? "—" : "1"}
                </strong>

                <span>
                  Hospital monitored
                </span>

              </div>

            </div>

          </div>

        </section>


        {/* =================================
            NOTICE
            ================================= */}

        <div className="resources-notice">

          <AlertCircle size={17} />

          <div>

            <strong>
              Important information
            </strong>

            <p>
              Resource availability can change quickly.
              Please contact the hospital directly to confirm
              availability before making travel arrangements.
            </p>

          </div>

        </div>

      </main>

    </div>
  );
}