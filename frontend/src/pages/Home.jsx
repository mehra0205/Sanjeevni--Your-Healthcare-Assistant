import { Link } from "react-router-dom";
import {
  CalendarDays,
  Ambulance,
  Droplets,
  FileText,
  ClipboardCheck,
  Stethoscope,
  ArrowRight,
  ShieldCheck,
  Clock3,
  HeartPulse,
  Search,
  Users,
  Building2,
  Star,
} from "lucide-react";

import ServiceCard from "../components/ServiceCard";

export default function Home() {
  return (
    <div className="home-page">

      {/* =========================
          HERO
      ========================= */}

      <section className="new-home-hero">

        <div className="new-hero-overlay" />

        <div className="container new-hero-container">

          {/* LEFT CONTENT */}

          <div className="new-hero-content">

            <div className="new-hero-badge">
              <HeartPulse size={15} />
              YOUR HEALTH, OUR PRIORITY
            </div>

            <h1>
              Better Healthcare
              <br />
              for a <span>Healthier</span>
              <br />
              <span>Tomorrow</span>
            </h1>

            <p>
              Sanjeevni brings doctors, appointments, emergency support,
              blood bank services, check-in and medical records together
              in one simple healthcare platform.
            </p>

            {/* SEARCH */}

            <div className="home-search-box">

              <Search size={20} />

              <input
                type="text"
                placeholder="Search doctors, hospitals, services..."
              />

              <button type="button">
                Search
              </button>

            </div>

          </div>


          {/* =========================
              HERO IMAGE
          ========================= */}

          <div className="new-hero-image">
          </div>

        </div>


        {/* =========================
            QUICK ACTIONS
        ========================= */}

        <div className="container hero-action-container">

          <Link
            to="/appointments"
            className="hero-action-card"
          >

            <div className="hero-action-icon blue">
              <CalendarDays size={23} />
            </div>

            <div>
              <strong>Book Appointment</strong>
              <span>
                Find and book your doctor easily
              </span>
            </div>

            <ArrowRight size={18} />

          </Link>


          <Link
            to="/doctors"
            className="hero-action-card"
          >

            <div className="hero-action-icon green">
              <Stethoscope size={23} />
            </div>

            <div>
              <strong>Find Doctors</strong>
              <span>
                Connect with trusted doctors
              </span>
            </div>

            <ArrowRight size={18} />

          </Link>


          <Link
            to="/ambulance"
            className="hero-action-card"
          >

            <div className="hero-action-icon red">
              <Ambulance size={23} />
            </div>

            <div>
              <strong>Emergency Help</strong>
              <span>
                Get 24/7 emergency assistance
              </span>
            </div>

            <ArrowRight size={18} />

          </Link>


          <Link
            to="/blood-bank"
            className="hero-action-card"
          >

            <div className="hero-action-icon pink">
              <Droplets size={23} />
            </div>

            <div>
              <strong>Blood Bank</strong>
              <span>
                Find or request blood easily
              </span>
            </div>

            <ArrowRight size={18} />

          </Link>

        </div>

      </section>


      {/* =========================
          TRUST STRIP
      ========================= */}

      <section className="home-trust-strip">

        <div className="container home-trust-grid">

          <div className="home-trust-item">

            <div className="home-trust-icon">
              <Clock3 size={22} />
            </div>

            <div>
              <strong>24/7</strong>
              <span>Emergency Support</span>
            </div>

          </div>


          <div className="home-trust-item">

            <div className="home-trust-icon">
              <ShieldCheck size={22} />
            </div>

            <div>
              <strong>Secure</strong>
              <span>Your Health Data</span>
            </div>

          </div>


          <div className="home-trust-item">

            <div className="home-trust-icon">
              <Users size={22} />
            </div>

            <div>
              <strong>Verified Doctors</strong>
              <span>Trusted & Experienced</span>
            </div>

          </div>


          <div className="home-trust-item">

            <div className="home-trust-icon">
              <HeartPulse size={22} />
            </div>

            <div>
              <strong>All in One Place</strong>
              <span>Healthcare Made Simple</span>
            </div>

          </div>

        </div>

      </section>


      {/* =========================
          COMPLETE HEALTHCARE
      ========================= */}

      <section className="container complete-healthcare">

        <div className="complete-healthcare-intro">

          <span className="eyebrow">
            OUR SERVICES
          </span>

          <h2>
            Complete Healthcare
            <br />
            <span>at Your Fingertips</span>
          </h2>

          <p>
            From appointments to emergency support, Sanjeevni
            makes healthcare simple, fast and accessible.
          </p>

          <Link
            to="/doctors"
            className="primary-button"
          >
            Explore All Services
            <ArrowRight size={17} />
          </Link>

        </div>


        <div className="featured-service-grid">

          {/* DOCTOR */}

          <Link
            to="/doctors"
            className="featured-service-card"
          >

            <div className="featured-service-image doctor-image">

              <div className="featured-image-label">
                Doctor Consultation
              </div>

            </div>

            <div className="featured-service-content">

              <h3>
                Doctor Consultation
              </h3>

              <p>
                Book appointments with experienced doctors
              </p>

              <span className="service-arrow">
                <ArrowRight size={17} />
              </span>

            </div>

          </Link>


          {/* AMBULANCE */}

          <Link
            to="/ambulance"
            className="featured-service-card"
          >

            <div className="featured-service-image ambulance-image">

              <div className="featured-image-label">
                Emergency Care
              </div>

            </div>

            <div className="featured-service-content">

              <h3>
                Ambulance Services
              </h3>

              <p>
                24/7 emergency assistance when you need it
              </p>

              <span className="service-arrow">
                <ArrowRight size={17} />
              </span>

            </div>

          </Link>


          {/* BLOOD BANK */}

          <Link
            to="/blood-bank"
            className="featured-service-card"
          >

            <div className="featured-service-image blood-image">

              <div className="featured-image-label">
                Blood Support
              </div>

            </div>

            <div className="featured-service-content">

              <h3>
                Blood Bank
              </h3>

              <p>
                Request or donate blood easily
              </p>

              <span className="service-arrow">
                <ArrowRight size={17} />
              </span>

            </div>

          </Link>


          {/* HOSPITAL RESOURCES */}

          <Link
            to="/hospital-resources"
            className="featured-service-card"
          >

            <div className="featured-service-image hospital-image">

              <div className="featured-image-label">
                Hospital Care
              </div>

            </div>

            <div className="featured-service-content">

              <h3>
                Hospital Resources
              </h3>

              <p>
                View real-time bed and resource availability
              </p>

              <span className="service-arrow">
                <ArrowRight size={17} />
              </span>

            </div>

          </Link>

        </div>

      </section>


      {/* =========================
          ALL SERVICES
      ========================= */}

      <section
        className="container home-services-section new-services-section"
        id="services"
      >

        <div className="section-heading home-section-heading">

          <div>

            <span className="eyebrow">
              MORE SERVICES
            </span>

            <h2>
              Everything you need for
              <span> better care.</span>
            </h2>

          </div>

          <p>
            Access important healthcare services from one
            simple platform.
          </p>

        </div>


        <div className="service-grid">

          <ServiceCard
            icon={<ClipboardCheck size={23} />}
            title="Self Check-In"
            text="Submit your symptoms before visiting the hospital."
            to="/checkin"
          />

          <ServiceCard
            icon={<Stethoscope size={23} />}
            title="Find a Doctor"
            text="Browse doctors by speciality and availability."
            to="/doctors"
          />

          <ServiceCard
            icon={<CalendarDays size={23} />}
            title="Appointments"
            text="Choose a suitable slot and manage your visits."
            to="/appointments"
          />

          <ServiceCard
            icon={<Ambulance size={23} />}
            title="Ambulance"
            text="Send an emergency support request quickly."
            to="/ambulance"
            danger
          />

          <ServiceCard
            icon={<Droplets size={23} />}
            title="Blood Bank"
            text="Create and track your blood requirement."
            to="/blood-bank"
          />

          <ServiceCard
            icon={<FileText size={23} />}
            title="Medical Records"
            text="Keep your important health records accessible."
            to="/records"
          />

        </div>

      </section>


      {/* =========================
          HOW IT WORKS
      ========================= */}

      <section className="how-section new-how-section">

        <div className="container">

          <div className="how-header">

            <span className="eyebrow">
              HOW SANJEEVNI WORKS
            </span>

            <h2>
              Healthcare access in
              <span> three simple steps.</span>
            </h2>

          </div>


          <div className="how-grid">

            <div className="how-step">

              <div className="step-number">
                01
              </div>

              <h3>
                Create your account
              </h3>

              <p>
                Register on Sanjeevni and create your
                personal healthcare profile.
              </p>

            </div>


            <div className="how-step">

              <div className="step-number">
                02
              </div>

              <h3>
                Choose a service
              </h3>

              <p>
                Book an appointment, check in, find blood,
                access records or request emergency help.
              </p>

            </div>


            <div className="how-step">

              <div className="step-number">
                03
              </div>

              <h3>
                Manage your healthcare
              </h3>

              <p>
                Keep your appointments and important
                healthcare information organised.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =========================
          GREEN STATISTICS
      ========================= */}

      <section className="container health-stat-section">

        <div className="health-stat-content">

          <div className="health-stat-quote">

            <span>
              “
            </span>

            <h2>
              A healthier tomorrow
              <br />
              is possible, together.
            </h2>

          </div>


          <div className="health-stat-items">

            <div className="health-stat-item">

              <Users size={25} />

              <strong>
                10,000+
              </strong>

              <span>
                Happy Users
              </span>

            </div>


            <div className="health-stat-item">

              <Stethoscope size={25} />

              <strong>
                500+
              </strong>

              <span>
                Verified Doctors
              </span>

            </div>


            <div className="health-stat-item">

              <Building2 size={25} />

              <strong>
                50+
              </strong>

              <span>
                Partner Hospitals
              </span>

            </div>


            <div className="health-stat-item">

              <Star size={25} />

              <strong>
                4.8/5
              </strong>

              <span>
                User Rating
              </span>

            </div>

          </div>

        </div>

      </section>


      {/* =========================
          FOOTER
      ========================= */}

      <footer
        className="home-footer"
        id="contact"
      >

        <div className="container footer-content">

          <div className="footer-brand">

            <Link
              to="/"
              className="brand"
            >

              <div className="brand-mark">
                +
              </div>

              <div className="brand-text">

                <span className="brand-name">
                  Sanjeevni
                </span>

                <span className="brand-tagline">
                  Healthcare for a Better Tomorrow
                </span>

              </div>

            </Link>

            <p>
              A smart hospital management and emergency
              response platform.
            </p>

          </div>


          <div className="footer-links">

            <div>

              <h4>
                Services
              </h4>

              <Link to="/doctors">
                Doctors
              </Link>

              <Link to="/appointments">
                Appointments
              </Link>

              <Link to="/ambulance">
                Emergency
              </Link>

              <Link to="/blood-bank">
                Blood Bank
              </Link>

            </div>


            <div id="about">

              <h4>
                Platform
              </h4>

              <Link to="/checkin">
                Self Check-In
              </Link>

              <Link to="/records">
                Medical Records
              </Link>

              <Link to="/login">
                Login
              </Link>

              <Link to="/register">
                Register
              </Link>

            </div>

          </div>

        </div>


        <div className="footer-bottom">

          <div className="container">

            <span>
              © {new Date().getFullYear()} Sanjeevni.
              All rights reserved.
            </span>

          </div>

        </div>

      </footer>

    </div>
  );
}