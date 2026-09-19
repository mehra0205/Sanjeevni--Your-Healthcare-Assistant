import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  Bell,
  Menu,
  LogOut,
} from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("sanjeevni_user") || "null"
  );

  const logout = () => {
    localStorage.removeItem("sanjeevni_token");
    localStorage.removeItem("sanjeevni_user");
    navigate("/login");
  };

  return (
    <header className="navbar">

      {/* Logo */}
      <Link className="brand" to="/">
        <div className="brand-mark">✚</div>

        <div className="brand-text">
          <span className="brand-name">Sanjeevni</span>
          <span className="brand-tagline">
            Healthcare for a Better Tomorrow
          </span>
        </div>
      </Link>

      {/* Public Navigation */}
      {!user && (
        <nav className="public-nav">
          <Link to="/">Home</Link>
          <Link to="/doctors">Doctors</Link>
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>

          <Link className="nav-login" to="/login">
            Login
          </Link>

          <Link className="nav-button" to="/register">
            Get Started
          </Link>
        </nav>
      )}

      {/* Logged-in Navigation */}
      {user && (
        <div className="logged-navbar">

          {/* Search */}
          <div className="navbar-search">
            <Search size={17} />

            <input
              type="text"
              placeholder="Search doctors, hospitals, services..."
            />
          </div>

          {/* Notification */}
          <button className="navbar-icon">
            <Bell size={19} />
          </button>

          {/* User */}
          <div className="navbar-user">

            <div className="user-avatar">
              {user.name
                ? user.name.charAt(0).toUpperCase()
                : "U"}
            </div>

            <div className="user-details">
              <strong>{user.name || "User"}</strong>

              <span>
                {user.role
                  ? user.role.charAt(0).toUpperCase() +
                    user.role.slice(1)
                  : "Patient"}
              </span>
            </div>

          </div>

          {/* Menu */}
          <button className="navbar-icon">
            <Menu size={20} />
          </button>

          {/* Logout */}
          <button
            className="logout-button"
            onClick={logout}
            title="Logout"
          >
            <LogOut size={17} />
          </button>

        </div>
      )}

    </header>
  );
}