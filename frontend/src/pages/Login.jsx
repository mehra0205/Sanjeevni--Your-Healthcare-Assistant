import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  HeartPulse,
  Mail,
  LockKeyhole,
  ArrowRight,
  ShieldCheck,
  Clock3,
} from "lucide-react";

import api from "../api";
import Message from "../components/Message";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    try {
      setError(false);
      setMessage("");

      const { data } = await api.post("/auth/login", form);

      // Save authentication data
      localStorage.setItem("sanjeevni_token", data.token);

      localStorage.setItem(
        "sanjeevni_user",
        JSON.stringify(data.user)
      );

      // Redirect according to user role
      if (data.user.role === "doctor") {
        navigate("/doctor-dashboard");
      } else if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }

    } catch (err) {
      setError(true);

      setMessage(
        err.response?.data?.message || "Login failed."
      );
    }
  };

  return (
    <div className="auth-modern-page">

      {/* =====================================
          LEFT SIDE
      ===================================== */}

      <div className="auth-info-panel">

        <Link to="/" className="auth-brand">

          <div className="auth-brand-mark">
            ✚
          </div>

          <div>
            <strong>
              Sanjeevni
            </strong>

            <span>
              Healthcare for a Better Tomorrow
            </span>
          </div>

        </Link>


        <div className="auth-info-content">

          <span className="eyebrow">
            WELCOME BACK
          </span>

          <h1>
            Your healthcare,
            <span> all in one place.</span>
          </h1>

          <p>
            Sign in to manage appointments, access your
            medical records, find doctors and use Sanjeevni's
            healthcare services.
          </p>


          {/* Benefits */}

          <div className="auth-benefits">

            <div>

              <div className="auth-benefit-icon">
                <ShieldCheck size={18} />
              </div>

              <div>

                <strong>
                  Secure & Private
                </strong>

                <span>
                  Your information stays protected.
                </span>

              </div>

            </div>


            <div>

              <div className="auth-benefit-icon">
                <Clock3 size={18} />
              </div>

              <div>

                <strong>
                  24/7 Emergency Support
                </strong>

                <span>
                  Help when you need it.
                </span>

              </div>

            </div>


            <div>

              <div className="auth-benefit-icon">
                <HeartPulse size={18} />
              </div>

              <div>

                <strong>
                  Simple Healthcare
                </strong>

                <span>
                  Everything from one dashboard.
                </span>

              </div>

            </div>

          </div>

        </div>


        <div className="auth-info-footer">
          © {new Date().getFullYear()} Sanjeevni
        </div>

      </div>


      {/* =====================================
          RIGHT SIDE
      ===================================== */}

      <div className="auth-form-panel">

        <div className="auth-form-wrapper">


          {/* Mobile Brand */}

          <div className="mobile-auth-brand">

            <div className="auth-brand-mark">
              ✚
            </div>

            <strong>
              Sanjeevni
            </strong>

          </div>


          {/* Heading */}

          <div className="auth-heading">

            <span className="eyebrow">
              ACCOUNT LOGIN
            </span>

            <h2>
              Welcome back 👋
            </h2>

            <p>
              Sign in to continue to your dashboard.
            </p>

          </div>


          {/* Login Form */}

          <form
            className="modern-auth-form"
            onSubmit={submit}
          >

            <Message
              text={message}
              error={error}
            />


            {/* Email */}

            <label>

              <span>
                Email address
              </span>

              <div className="input-wrapper">

                <Mail size={17} />

                <input
                  type="email"
                  placeholder="you@example.com"
                  required
                  value={form.email}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      email: e.target.value,
                    })
                  }
                />

              </div>

            </label>


            {/* Password */}

            <label>

              <span>
                Password
              </span>

              <div className="input-wrapper">

                <LockKeyhole size={17} />

                <input
                  type="password"
                  placeholder="Enter your password"
                  required
                  value={form.password}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      password: e.target.value,
                    })
                  }
                />

              </div>

            </label>


            {/* Submit */}

            <button
              className="auth-submit-button"
              type="submit"
            >

              Sign in

              <ArrowRight size={17} />

            </button>

          </form>


          {/* Divider */}

          <div className="auth-divider">
            <span>
              OR
            </span>
          </div>


          {/* Register */}

          <p className="auth-register-text">

            Don't have an account?

            <Link to="/register">
              Create an account
            </Link>

          </p>


          {/* Demo Patient Account */}

          <div className="demo-login-box">

            <div className="demo-login-icon">
              <HeartPulse size={18} />
            </div>

            <div>

              <strong>
                Demo Patient Account
              </strong>

              <span>
                patient@sanjeevni.com
              </span>

              <span>
                Password: Patient@123
              </span>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}