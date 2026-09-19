import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Shield,
  Settings as SettingsIcon,
} from "lucide-react";

export default function Settings() {
  const [user] = useState(() =>
    JSON.parse(localStorage.getItem("sanjeevni_user") || "null")
  );

  const role = user?.role || "patient";

  const roleLabel =
    role === "doctor"
      ? "Doctor"
      : role === "admin"
      ? "Administrator"
      : "Patient";

  return (
    <div className="page-container settings-page">

      <div className="page-header">
        <div>
          <p className="eyebrow">ACCOUNT</p>
          <h1>Profile & Settings</h1>
          <p>
            Manage your Sanjeevni profile information.
          </p>
        </div>

        <div className="settings-header-icon">
          <SettingsIcon size={24} />
        </div>
      </div>


      <div className="settings-grid">

        {/* Profile Card */}

        <section className="settings-card profile-card">

          <div className="profile-avatar-large">
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <h2>{user?.name || "User"}</h2>

          <span className="profile-role">
            {roleLabel}
          </span>

          <p className="profile-description">
            Your Sanjeevni healthcare account profile.
          </p>

        </section>


        {/* Account Information */}

        <section className="settings-card">

          <div className="settings-card-title">
            <User size={19} />

            <div>
              <h2>Account Information</h2>
              <p>Your registered account details</p>
            </div>
          </div>


          <div className="settings-info-list">

            <div className="settings-info-item">

              <div className="settings-info-icon">
                <User size={18} />
              </div>

              <div>
                <span>Full Name</span>
                <strong>
                  {user?.name || "Not available"}
                </strong>
              </div>

            </div>


            <div className="settings-info-item">

              <div className="settings-info-icon">
                <Mail size={18} />
              </div>

              <div>
                <span>Email Address</span>
                <strong>
                  {user?.email || "Not available"}
                </strong>
              </div>

            </div>


            <div className="settings-info-item">

              <div className="settings-info-icon">
                <Phone size={18} />
              </div>

              <div>
                <span>Phone Number</span>
                <strong>
                  {user?.phone || "Not provided"}
                </strong>
              </div>

            </div>


            <div className="settings-info-item">

              <div className="settings-info-icon">
                <Shield size={18} />
              </div>

              <div>
                <span>Account Role</span>
                <strong>
                  {roleLabel}
                </strong>
              </div>

            </div>

          </div>

        </section>

      </div>

    </div>
  );
}