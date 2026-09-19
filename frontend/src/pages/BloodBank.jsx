import { useEffect, useState } from "react";
import {
  Droplets,
  Building2,
  AlertTriangle,
  CheckCircle2,
  Clock3,
  ArrowRight,
  HeartPulse,
} from "lucide-react";

import api from "../api";
import Message from "../components/Message";

export default function BloodBank() {
  const [form, setForm] = useState({
    bloodGroup: "A+",
    units: 1,
    hospital: "",
    urgency: "Normal",
  });

  const [items, setItems] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const load = () =>
    api.get("/blood/mine").then((r) => setItems(r.data));

  useEffect(() => {
    load();
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/blood", form);

      setMessage("Blood request submitted.");
      setError(false);

      setForm({
        bloodGroup: "A+",
        units: 1,
        hospital: "",
        urgency: "Normal",
      });

      load();
    } catch {
      setError(true);
      setMessage("Could not submit request.");
    }
  };

  return (
    <div className="blood-page">

      {/* =================================
          HEADER
      ================================= */}

      <section className="blood-header">

        <div className="container">

          <div className="blood-header-content">

            <div>

              <span className="eyebrow">
                BLOOD BANK
              </span>

              <h1>
                Blood support
                <span> when it matters.</span>
              </h1>

              <p>
                Submit a blood requirement and keep track
                of your request through Sanjeevni.
              </p>

            </div>

            <div className="blood-header-icon">
              <Droplets size={48} />
            </div>

          </div>

        </div>

      </section>


      {/* =================================
          CONTENT
      ================================= */}

      <main className="container blood-content">

        <div className="blood-info-banner">

          <div className="blood-banner-icon">
            <HeartPulse size={20} />
          </div>

          <div>

            <strong>
              Need blood support?
            </strong>

            <p>
              Submit the required blood group, units and
              hospital information below.
            </p>

          </div>

        </div>


        <div className="blood-layout">

          {/* =================================
              REQUEST FORM
          ================================= */}

          <section className="blood-form-card">

            <div className="blood-card-heading">

              <div className="blood-heading-icon">
                <Droplets size={20} />
              </div>

              <div>

                <h2>
                  New Blood Request
                </h2>

                <p>
                  Provide the details of your requirement.
                </p>

              </div>

            </div>


            <form
              className="blood-form"
              onSubmit={submit}
            >

              <Message
                text={message}
                error={error}
              />


              {/* Blood Group */}

              <label>

                <span>
                  Blood Group
                </span>

                <div className="blood-input">

                  <Droplets size={16} />

                  <select
                    value={form.bloodGroup}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        bloodGroup: e.target.value,
                      })
                    }
                  >

                    {[
                      "A+",
                      "A-",
                      "B+",
                      "B-",
                      "AB+",
                      "AB-",
                      "O+",
                      "O-",
                    ].map((group) => (
                      <option key={group}>
                        {group}
                      </option>
                    ))}

                  </select>

                </div>

              </label>


              {/* Units */}

              <label>

                <span>
                  Units Required
                </span>

                <div className="blood-input">

                  <Droplets size={16} />

                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={form.units}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        units: e.target.value,
                      })
                    }
                  />

                </div>

              </label>


              {/* Hospital */}

              <label>

                <span>
                  Hospital
                </span>

                <div className="blood-input">

                  <Building2 size={16} />

                  <input
                    required
                    placeholder="Enter hospital name"
                    value={form.hospital}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        hospital: e.target.value,
                      })
                    }
                  />

                </div>

              </label>


              {/* Urgency */}

              <label>

                <span>
                  Urgency
                </span>

                <div className="blood-input">

                  <AlertTriangle size={16} />

                  <select
                    value={form.urgency}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        urgency: e.target.value,
                      })
                    }
                  >

                    <option>
                      Normal
                    </option>

                    <option>
                      Urgent
                    </option>

                    <option>
                      Critical
                    </option>

                  </select>

                </div>

              </label>


              <button
                className="blood-submit"
                type="submit"
              >

                <Droplets size={17} />

                Submit Blood Request

                <ArrowRight size={15} />

              </button>

            </form>


            <div className="blood-form-note">

              <CheckCircle2 size={14} />

              <span>
                Your request will be tracked in your
                request history.
              </span>

            </div>

          </section>


          {/* =================================
              REQUEST HISTORY
          ================================= */}

          <section className="blood-history">

            <div className="blood-history-heading">

              <div>

                <h2>
                  Your Requests
                </h2>

                <p>
                  Track the status of your blood requirements.
                </p>

              </div>

              <div className="blood-count">
                {items.length}
              </div>

            </div>


            {items.length === 0 ? (

              <div className="blood-empty">

                <div className="blood-empty-icon">
                  <Droplets size={25} />
                </div>

                <h3>
                  No requests yet
                </h3>

                <p>
                  Your blood requests will appear here.
                </p>

              </div>

            ) : (

              <div className="blood-request-list">

                {items.map((item) => (

                  <article
                    className="blood-request-card"
                    key={item._id}
                  >

                    <div className="blood-request-top">

                      <div className="blood-group-badge">
                        {item.bloodGroup}
                      </div>

                      <span
                        className={`blood-status ${
                          item.urgency?.toLowerCase()
                        }`}
                      >
                        {item.status}
                      </span>

                    </div>


                    <h3>
                      {item.units} unit
                      {item.units !== 1 ? "s" : ""}
                      {" "}required
                    </h3>


                    <div className="blood-request-details">

                      <div>

                        <Building2 size={14} />

                        <span>
                          {item.hospital}
                        </span>

                      </div>

                      <div>

                        <AlertTriangle size={14} />

                        <span>
                          {item.urgency}
                        </span>

                      </div>

                    </div>


                    <div className="blood-request-footer">

                      <Clock3 size={13} />

                      <span>
                        Request status: {item.status}
                      </span>

                    </div>

                  </article>

                ))}

              </div>

            )}

          </section>

        </div>

      </main>

    </div>
  );
}