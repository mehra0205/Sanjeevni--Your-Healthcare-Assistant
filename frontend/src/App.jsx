import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import Doctors from "./pages/Doctors";
import Appointments from "./pages/Appointments";
import Checkin from "./pages/Checkin";
import Ambulance from "./pages/Ambulance";
import BloodBank from "./pages/BloodBank";
import Records from "./pages/Records";

import HospitalResources from "./pages/HospitalResources";
import DoctorDashboard from "./pages/DoctorDashboard";
import Admin from "./pages/Admin";
import Settings from "./pages/Settings";

import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <>
      <Navbar />

      <main>
        <Routes>

          {/* =================================
              PUBLIC PAGES
          ================================= */}

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/doctors"
            element={<Doctors />}
          />


          {/* =================================
              PATIENT / PROTECTED PAGES
          ================================= */}

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/appointments"
            element={
              <ProtectedRoute>
                <Appointments />
              </ProtectedRoute>
            }
          />

          <Route
            path="/checkin"
            element={
              <ProtectedRoute>
                <Checkin />
              </ProtectedRoute>
            }
          />

          <Route
            path="/ambulance"
            element={
              <ProtectedRoute>
                <Ambulance />
              </ProtectedRoute>
            }
          />

          <Route
            path="/blood-bank"
            element={
              <ProtectedRoute>
                <BloodBank />
              </ProtectedRoute>
            }
          />

          <Route
            path="/records"
            element={
              <ProtectedRoute>
                <Records />
              </ProtectedRoute>
            }
          />

          <Route
            path="/hospital-resources"
            element={
              <ProtectedRoute>
                <HospitalResources />
              </ProtectedRoute>
            }
          />


          {/* =================================
              SETTINGS / PROFILE
          ================================= */}

          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />


          {/* =================================
              DOCTOR DASHBOARD
          ================================= */}

          <Route
            path="/doctor-dashboard"
            element={
              <ProtectedRoute doctor>
                <DoctorDashboard />
              </ProtectedRoute>
            }
          />


          {/* =================================
              ADMIN DASHBOARD
          ================================= */}

          <Route
            path="/admin"
            element={
              <ProtectedRoute admin>
                <Admin />
              </ProtectedRoute>
            }
          />

        </Routes>
      </main>


      {/* =================================
          FOOTER
      ================================= */}

      <footer>
        © 2026 Sanjeevni · Healthcare assistance made simpler
      </footer>
    </>
  );
}