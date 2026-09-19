import { useEffect, useState } from "react";
import {
  FileText,
  UserRound,
  CalendarDays,
  Stethoscope,
  ClipboardList,
  Upload,
  FileCheck2,
  Plus,
} from "lucide-react";

import api from "../api";
import Message from "../components/Message";

export default function Records() {
  const [records, setRecords] = useState([]);

  const [form, setForm] = useState({
    title: "",
    doctorName: "",
    date: "",
    diagnosis: "",
    prescription: "",
  });

  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const load = () =>
    api.get("/records/mine").then((r) => setRecords(r.data));

  useEffect(() => {
    load();
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      data.append(key, value);
    });

    if (file) {
      data.append("file", file);
    }

    try {
      await api.post("/records", data);

      setMessage("Medical record added.");

      setForm({
        title: "",
        doctorName: "",
        date: "",
        diagnosis: "",
        prescription: "",
      });

      setFile(null);

      // Reset file input
      const fileInput = document.getElementById("record-file");
      if (fileInput) fileInput.value = "";

      load();
    } catch {
      setMessage("Could not add record.");
    }
  };

  return (
    <div className="records-page">

      {/* =====================================
          PAGE HEADER
      ===================================== */}

      <section className="records-header">

        <div className="container records-header-content">

          <div>

            <span className="eyebrow">
              MEDICAL RECORDS
            </span>

            <h1>
              Your health
              <span> history.</span>
            </h1>

            <p>
              Keep your important medical information,
              diagnoses and prescriptions organized in one place.
            </p>

          </div>

          <div className="records-header-icon">
            <FileText size={45} />
          </div>

        </div>

      </section>


      {/* =====================================
          MAIN CONTENT
      ===================================== */}

      <main className="container records-content">

        <div className="records-info">

          <div className="records-info-icon">
            <FileCheck2 size={19} />
          </div>

          <div>

            <strong>
              Your medical information, organized.
            </strong>

            <p>
              Add visit details and optionally attach
              supporting documents or reports.
            </p>

          </div>

        </div>


        <div className="records-layout">

          {/* =================================
              ADD RECORD
          ================================= */}

          <section className="record-form-card">

            <div className="record-form-heading">

              <div className="record-heading-icon">
                <Plus size={19} />
              </div>

              <div>

                <h2>
                  Add Medical Record
                </h2>

                <p>
                  Enter the details from your visit.
                </p>

              </div>

            </div>


            <form
              className="record-form"
              onSubmit={submit}
            >

              <Message text={message} />


              {/* Record title */}

              <label>

                <span>
                  Record Title
                </span>

                <div className="record-input">

                  <FileText size={16} />

                  <input
                    required
                    placeholder="e.g. Blood test report"
                    value={form.title}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        title: e.target.value,
                      })
                    }
                  />

                </div>

              </label>


              {/* Doctor */}

              <label>

                <span>
                  Doctor Name
                </span>

                <div className="record-input">

                  <UserRound size={16} />

                  <input
                    placeholder="Enter doctor's name"
                    value={form.doctorName}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        doctorName: e.target.value,
                      })
                    }
                  />

                </div>

              </label>


              {/* Date */}

              <label>

                <span>
                  Visit Date
                </span>

                <div className="record-input">

                  <CalendarDays size={16} />

                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        date: e.target.value,
                      })
                    }
                  />

                </div>

              </label>


              {/* Diagnosis */}

              <label>

                <span>
                  Diagnosis
                </span>

                <div className="record-input">

                  <Stethoscope size={16} />

                  <input
                    placeholder="Enter diagnosis"
                    value={form.diagnosis}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        diagnosis: e.target.value,
                      })
                    }
                  />

                </div>

              </label>


              {/* Prescription */}

              <label>

                <span>
                  Prescription / Notes
                </span>

                <div className="record-textarea">

                  <ClipboardList size={16} />

                  <textarea
                    placeholder="Add prescription, instructions or other notes..."
                    value={form.prescription}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        prescription: e.target.value,
                      })
                    }
                  />

                </div>

              </label>


              {/* File */}

              <label>

                <span>
                  Attach File
                </span>

                <div className="record-file">

                  <Upload size={18} />

                  <div>

                    <strong>
                      {file
                        ? file.name
                        : "Choose a medical document"}
                    </strong>

                    <small>
                      PDF, image or other supported document
                    </small>

                  </div>

                  <input
                    id="record-file"
                    type="file"
                    onChange={(e) =>
                      setFile(e.target.files[0])
                    }
                  />

                </div>

              </label>


              <button
                className="record-submit"
                type="submit"
              >

                <FileCheck2 size={17} />

                Save Medical Record

              </button>

            </form>


            <div className="record-security-note">

              <FileCheck2 size={14} />

              <span>
                Keep your medical documents safe and accessible
                through your Sanjeevni account.
              </span>

            </div>

          </section>


          {/* =================================
              SAVED RECORDS
          ================================= */}

          <section className="saved-records">

            <div className="saved-records-heading">

              <div>

                <h2>
                  Saved Records
                </h2>

                <p>
                  Your previously added medical information.
                </p>

              </div>

              <div className="records-count">
                {records.length}
              </div>

            </div>


            {records.length === 0 ? (

              <div className="records-empty">

                <div className="records-empty-icon">
                  <FileText size={26} />
                </div>

                <h3>
                  No medical records yet
                </h3>

                <p>
                  Add your first record using the form.
                </p>

              </div>

            ) : (

              <div className="records-list">

                {records.map((record) => (

                  <article
                    className="saved-record-card"
                    key={record._id}
                  >

                    <div className="saved-record-top">

                      <div className="saved-record-icon">
                        <FileText size={20} />
                      </div>

                      <div className="saved-record-date">
                        <CalendarDays size={13} />
                        {record.date || "Date not added"}
                      </div>

                    </div>


                    <h3>
                      {record.title}
                    </h3>


                    <div className="saved-record-doctor">

                      <UserRound size={14} />

                      <span>
                        {record.doctorName ||
                          "Doctor not added"}
                      </span>

                    </div>


                    <div className="record-detail">

                      <strong>
                        Diagnosis
                      </strong>

                      <p>
                        {record.diagnosis || "—"}
                      </p>

                    </div>


                    <div className="record-detail">

                      <strong>
                        Prescription / Notes
                      </strong>

                      <p>
                        {record.prescription || "—"}
                      </p>

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