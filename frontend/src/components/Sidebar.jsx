import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarDays,
  Stethoscope,
  Ambulance,
  Droplets,
  FileText,
  ClipboardCheck,
  BedDouble,
  Settings,
  LogOut,
  ShieldCheck,
} from "lucide-react";

export default function Sidebar() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("sanjeevni_user") || "null"
  );

  const role = user?.role || "patient";

  const dashboardPath =
    role === "doctor"
      ? "/doctor-dashboard"
      : role === "admin"
      ? "/admin"
      : "/dashboard";

  const dashboardLabel =
    role === "doctor"
      ? "Doctor Dashboard"
      : role === "admin"
      ? "Admin Dashboard"
      : "Dashboard";

  const logout = () => {
    localStorage.removeItem("sanjeevni_token");
    localStorage.removeItem("sanjeevni_user");

    navigate("/login");
  };

  const patientLinks = [
    {
      label: "Appointments",
      path: "/appointments",
      icon: CalendarDays,
    },
    {
      label: "Doctors",
      path: "/doctors",
      icon: Stethoscope,
    },
    {
      label: "Ambulance",
      path: "/ambulance",
      icon: Ambulance,
    },
    {
      label: "Blood Bank",
      path: "/blood-bank",
      icon: Droplets,
    },
    {
      label: "Medical Records",
      path: "/records",
      icon: FileText,
    },
    {
      label: "Self Check-In",
      path: "/checkin",
      icon: ClipboardCheck,
    },
    {
      label: "Hospital Resources",
      path: "/hospital-resources",
      icon: BedDouble,
    },
  ];

  const doctorLinks = [
    {
      label: "Appointments",
      path: "/appointments",
      icon: CalendarDays,
    },
    {
      label: "Doctors",
      path: "/doctors",
      icon: Stethoscope,
    },
    {
      label: "Medical Records",
      path: "/records",
      icon: FileText,
    },
    {
      label: "Hospital Resources",
      path: "/hospital-resources",
      icon: BedDouble,
    },
  ];

  const adminLinks = [
    {
      label: "Hospital Resources",
      path: "/hospital-resources",
      icon: BedDouble,
    },
    {
      label: "Appointments",
      path: "/appointments",
      icon: CalendarDays,
    },
    {
      label: "Doctors",
      path: "/doctors",
      icon: Stethoscope,
    },
    {
      label: "Ambulance",
      path: "/ambulance",
      icon: Ambulance,
    },
    {
      label: "Blood Bank",
      path: "/blood-bank",
      icon: Droplets,
    },
  ];

  const links =
    role === "doctor"
      ? doctorLinks
      : role === "admin"
      ? adminLinks
      : patientLinks;

  return (
    <aside className="sidebar">

      {/* =====================================
          BRAND
          ===================================== */}

      <div className="sidebar-brand">

        <div className="sidebar-brand-icon">
          <ShieldCheck size={21} />
        </div>

        <div>
          <strong>Sanjeevni</strong>
          <span>
            {role === "doctor"
              ? "Doctor Workspace"
              : role === "admin"
              ? "Administration"
              : "Healthcare"}
          </span>
        </div>

      </div>


      {/* =====================================
          USER
          ===================================== */}

      <div className="sidebar-user">

        <div className="sidebar-user-avatar">
          {user?.name?.charAt(0)?.toUpperCase() || "U"}
        </div>

        <div className="sidebar-user-info">

          <strong>
            {user?.name || "User"}
          </strong>

          <span>
            {role === "doctor"
              ? "Doctor"
              : role === "admin"
              ? "Administrator"
              : "Patient"}
          </span>

        </div>

      </div>


      {/* =====================================
          NAVIGATION
          ===================================== */}

      <nav className="sidebar-navigation">

        <NavLink
          to={dashboardPath}
          className={({ isActive }) =>
            `sidebar-link ${
              isActive ? "active" : ""
            }`
          }
        >
          <LayoutDashboard size={18} />

          <span>
            {dashboardLabel}
          </span>
        </NavLink>


        <div className="sidebar-section-label">
          SERVICES
        </div>


        {links.map((link) => {

          const Icon = link.icon;

          return (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `sidebar-link ${
                  isActive ? "active" : ""
                }`
              }
            >
              <Icon size={18} />

              <span>
                {link.label}
              </span>
            </NavLink>
          );

        })}

      </nav>


      {/* =====================================
          BOTTOM
          ===================================== */}

      <div className="sidebar-bottom">

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `sidebar-link ${
              isActive ? "active" : ""
            }`
          }
        >
          <Settings size={18} />

          <span>
            Settings
          </span>
        </NavLink>


        <button
          type="button"
          className="sidebar-link sidebar-logout"
          onClick={logout}
        >
          <LogOut size={18} />

          <span>
            Logout
          </span>
        </button>

      </div>

    </aside>
  );
}