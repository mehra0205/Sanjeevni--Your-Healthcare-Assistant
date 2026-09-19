import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  HeartPulse,
  Mail,
  LockKeyhole,
  User,
  Phone,
  ArrowRight,
  ShieldCheck,
  CalendarCheck,
} from "lucide-react";

import api from "../api";
import Message from "../components/Message";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.post("/auth/register", form);

      localStorage.setItem("sanjeevni_token", data.token);
      localStorage.setItem(
        "sanjeevni_user",
        JSON.stringify(data.user)
      );

      navigate("/dashboard");
    } catch (err) {
      setError(true);
      setMessage(
        err.response?.data?.message || "Registration failed."
      );
    }
  };

  const updateField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });
  };

  return (
    <div className="auth-modern-page">

      {/* =================================
          LEFT INFORMATION PANEL
      ================================= */}

      <div className="auth-info-panel">

        <Link to="/" className="auth-brand">

          <div className="auth-brand-mark">
            ✚
          </div>

          <div>
            <strong>Sanjeevni</strong>
            <span>
              Healthcare for a Better Tomorrow
            </span>
          </div>

        </Link>


        <div className="auth-info-content">

          <span className="eyebrow">
            JOIN SANJEEVNI
          </span>

          <h1>
            Take control of
            <span> your healthcare.</span>
          </h1>

          <p>
            Create your Sanjeevni account and manage your
            everyday healthcare needs from one convenient
            platform.
          </p>


          <div className="auth-benefits">

            <div>

              <div className="auth-benefit-icon">
                <CalendarCheck size={18} />
              </div>

              <div>
                <strong>Easy Appointments</strong>
                <span>
                  Find doctors and book appointments.
                </span>
              </div>

            </div>


            <div>

              <div className="auth-benefit-icon">
                <ShieldCheck size={18} />
              </div>

              <div>
                <strong>Secure Information</strong>
                <span>
                  Keep your healthcare information protected.
                </span>
              </div>

            </div>


            <div>

              <div className="auth-benefit-icon">
                <HeartPulse size={18} />
              </div>

              <div>
                <strong>One Healthcare Platform</strong>
                <span>
                  Access essential services in one place.
                </span>
              </div>

            </div>

          </div>

        </div>


        <div className="auth-info-footer">
          © {new Date().getFullYear()} Sanjeevni
        </div>

      </div>


      {/* =================================
          RIGHT REGISTER PANEL
      ================================= */}

      <div className="auth-form-panel">

        <div className="auth-form-wrapper">

          {/* Mobile brand */}

          <div className="mobile-auth-brand">

            <div className="auth-brand-mark">
              ✚
            </div>

            <strong>Sanjeevni</strong>

          </div>


          {/* Heading */}

          <div className="auth-heading">

            <span className="eyebrow">
              CREATE ACCOUNT
            </span>

            <h2>
              Get started 🚀
            </h2>

            <p>
              Create your account to access Sanjeevni.
            </p>

          </div>


          {/* Form */}

          <form
            className="modern-auth-form register-form"
            onSubmit={submit}
          >

            <Message
              text={message}
              error={error}
            />


            {/* Name */}

            <label>

              <span>Full name</span>

              <div className="input-wrapper">

                <User size={17} />

                <input
                  type="text"
                  placeholder="Enter your full name"
                  required
                  value={form.name}
                  onChange={(e) =>
                    updateField("name", e.target.value)
                  }
                />

              </div>

            </label>


            {/* Email */}

            <label>

              <span>Email address</span>

              <div className="input-wrapper">

                <Mail size={17} />

                <input
                  type="email"
                  placeholder="you@example.com"
                  required
                  value={form.email}
                  onChange={(e) =>
                    updateField("email", e.target.value)
                  }
                />

              </div>

            </label>


            {/* Phone */}

            <label>

              <span>Phone number</span>

              <div className="input-wrapper">

                <Phone size={17} />

                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  required
                  value={form.phone}
                  onChange={(e) =>
                    updateField("phone", e.target.value)
                  }
                />

              </div>

            </label>


            {/* Password */}

            <label>

              <span>Password</span>

              <div className="input-wrapper">

                <LockKeyhole size={17} />

                <input
                  type="password"
                  placeholder="Create a password"
                  minLength="6"
                  required
                  value={form.password}
                  onChange={(e) =>
                    updateField("password", e.target.value)
                  }
                />

              </div>

            </label>


            {/* Submit */}

            <button
              className="auth-submit-button"
              type="submit"
            >
              Create account
              <ArrowRight size={17} />
            </button>

          </form>


          {/* Login */}

          <div className="auth-divider">
            <span>OR</span>
          </div>


          <p className="auth-register-text">
            Already have an account?
            <Link to="/login">
              Sign in
            </Link>
          </p>


          {/* Security note */}

          <div className="register-security-note">

            <ShieldCheck size={16} />

            <span>
              Your information is securely handled by
              the Sanjeevni platform.
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}