import { useState } from "react";
import {
  ClipboardCheck,
  HeartPulse,
  AlertTriangle,
  FileText,
  Send,
  ShieldCheck,
} from "lucide-react";

import api from "../api";
import Message from "../components/Message";

export default function Checkin() {
  const [form, setForm] = useState({
    symptoms: "",
    emergency: false,
    notes: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/checkins", form);

      setError(false);

      setMessage(
        "Check-in submitted. The hospital team can now review it."
      );

      setForm({
        symptoms: "",
        emergency: false,
        notes: "",
      });
    } catch {
      setError(true);
      setMessage("Could not submit check-in.");
    }
  };

  return (
    <div className="checkin-page">

      {/* =====================================
          HEADER
      ===================================== */}

      <section className="checkin-header">

        <div className="container checkin-header-content">

          <div>

            <span className="eyebrow">
              SELF CHECK-IN
            </span>

            <h1>
              Tell us how
              <span> you're feeling.</span>
            </h1>

            <p>
              Share your symptoms before your visit so the
              care team can better understand your needs.
            </p>

          </div>

          <div className="checkin-header-icon">
            <ClipboardCheck size={46} />
          </div>

        </div>

      </section>


      {/* =====================================
          MAIN
      ===================================== */}

      <main className="container checkin-content">

        {/* Information banner */}

        <div className="checkin-info-banner">

          <div className="checkin-info-icon">
            <HeartPulse size={19} />
          </div>

          <div>

            <strong>
              Complete your check-in before arriving
            </strong>

            <p>
              Your responses help the hospital team prepare
              for your visit.
            </p>

          </div>

        </div>


        <div className="checkin-layout">

          {/* =================================
              FORM
          ================================= */}

          <section className="checkin-card">

            <div className="checkin-card-heading">

              <div className="checkin-heading-icon">
                <ClipboardCheck size={20} />
              </div>

              <div>

                <h2>
                  Patient Self Check-In
                </h2>

                <p>
                  Tell us about your current condition.
                </p>

              </div>

            </div>


            <form
              className="checkin-form"
              onSubmit={submit}
            >

              <Message
                text={message}
                error={error}
              />


              {/* Symptoms */}

              <label>

                <span>
                  Current Symptoms
                </span>

                <div className="checkin-textarea">

                  <HeartPulse size={17} />

                  <textarea
                    required
                    placeholder="Example: fever, headache, cough..."
                    value={form.symptoms}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        symptoms: e.target.value,
                      })
                    }
                  />

                </div>

                <small>
                  Describe the symptoms you are currently experiencing.
                </small>

              </label>


              {/* Emergency */}

              <div
                className={`emergency-check ${
                  form.emergency ? "selected" : ""
                }`}
              >

                <div className="emergency-check-icon">
                  <AlertTriangle size={19} />
                </div>

                <div className="emergency-check-content">

                  <strong>
                    Is this an emergency?
                  </strong>

                  <p>
                    Select this if you need urgent medical attention.
                  </p>

                </div>

                <label className="emergency-switch">

                  <input
                    type="checkbox"
                    checked={form.emergency}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        emergency: e.target.checked,
                      })
                    }
                  />

                  <span></span>

                </label>

              </div>


              {/* Additional notes */}

              <label>

                <span>
                  Additional Notes
                </span>

                <div className="checkin-textarea">

                  <FileText size={17} />

                  <textarea
                    placeholder="Any allergies, previous conditions or other information?"
                    value={form.notes}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        notes: e.target.value,
                      })
                    }
                  />

                </div>

                <small>
                  Include anything you think the care team should know.
                </small>

              </label>


              <button
                className="checkin-submit"
                type="submit"
              >

                <Send size={16} />

                Submit Check-In

              </button>

            </form>


            <div className="checkin-security">

              <ShieldCheck size={15} />

              <span>
                Your information is submitted securely to
                the hospital care workflow.
              </span>

            </div>

          </section>


          {/* =================================
              SIDE INFORMATION
          ================================= */}

          <aside className="checkin-side">

            <div className="checkin-side-card">

              <div className="checkin-side-icon">
                <HeartPulse size={21} />
              </div>

              <h3>
                Why self check-in?
              </h3>

              <p>
                Giving the care team information about your
                symptoms before your visit can help them
                understand your situation faster.
              </p>

              <div className="checkin-benefit">

                <span>01</span>

                <div>
                  <strong>
                    Describe symptoms
                  </strong>

                  <small>
                    Tell us what you're experiencing.
                  </small>
                </div>

              </div>

              <div className="checkin-benefit">

                <span>02</span>

                <div>
                  <strong>
                    Mention important details
                  </strong>

                  <small>
                    Add allergies or relevant information.
                  </small>
                </div>

              </div>

              <div className="checkin-benefit">

                <span>03</span>

                <div>
                  <strong>
                    Submit before arrival
                  </strong>

                  <small>
                    Let the care team review your check-in.
                  </small>
                </div>

              </div>

            </div>


            <div className="checkin-emergency-note">

              <AlertTriangle size={18} />

              <div>

                <strong>
                  Medical emergency?
                </strong>

                <p>
                  If you are experiencing a life-threatening
                  emergency, contact your local emergency
                  services immediately.
                </p>

              </div>

            </div>

          </aside>

        </div>

      </main>

    </div>
  );
}