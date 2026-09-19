import { useEffect, useState } from "react";
import api from "../api";
import Message from "../components/Message";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";

import {
  Ambulance as AmbulanceIcon,
  MapPin,
  Phone,
  AlertTriangle,
  Navigation,
  Clock3,
  CheckCircle2,
  ArrowRight,
  History,
} from "lucide-react";

import L from "leaflet";
import "leaflet-defaulticon-compatibility";

const ambulanceIcon = new L.Icon({
  iconUrl:
    "https://cdn-icons-png.flaticon.com/512/296/296216.png",
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -35],
});

function MapController({ location }) {
  const map = useMap();

  useEffect(() => {
    if (location) {
      map.setView(location, 14);
    }
  }, [location, map]);

  return null;
}

export default function Ambulance() {
  const [form, setForm] = useState({
    location: "",
    emergencyType: "Medical emergency",
    phone: "",
  });

  const [items, setItems] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const [userLocation, setUserLocation] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState("");

  const [recommendedAmbulance, setRecommendedAmbulance] =
    useState(null);

  const ambulances = [
    {
      id: "AMB-101",
      name: "Sanjeevni Ambulance 101",
      position: [28.6139, 77.2090],
      status: "Available",
    },
    {
      id: "AMB-102",
      name: "Sanjeevni Ambulance 102",
      position: [28.6200, 77.2150],
      status: "Available",
    },
    {
      id: "AMB-103",
      name: "Sanjeevni Ambulance 103",
      position: [28.6050, 77.2250],
      status: "Available",
    },
  ];

  const load = () => {
    api
      .get("/ambulances/mine")
      .then((r) => setItems(r.data))
      .catch(() => setItems([]));
  };

  useEffect(() => {
    load();
  }, []);

  const calculateDistance = (
    lat1,
    lon1,
    lat2,
    lon2
  ) => {
    const R = 6371;

    const dLat =
      ((lat2 - lat1) * Math.PI) / 180;

    const dLon =
      ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) *
        Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c =
      2 *
      Math.atan2(
        Math.sqrt(a),
        Math.sqrt(1 - a)
      );

    return R * c;
  };

  const getLocation = () => {
    setLocationLoading(true);
    setLocationError("");

    if (!navigator.geolocation) {
      setLocationError(
        "Geolocation is not supported by your browser."
      );

      setLocationLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        const currentLocation = [lat, lng];

        setUserLocation(currentLocation);

        setForm((previous) => ({
          ...previous,
          location: `Current location (${lat.toFixed(
            5
          )}, ${lng.toFixed(5)})`,
        }));

        let nearest = null;
        let shortestDistance = Infinity;

        ambulances.forEach((ambulance) => {
          const distance = calculateDistance(
            lat,
            lng,
            ambulance.position[0],
            ambulance.position[1]
          );

          if (distance < shortestDistance) {
            shortestDistance = distance;

            nearest = {
              ...ambulance,
              distance: distance.toFixed(1),
            };
          }
        });

        setRecommendedAmbulance(nearest);
        setLocationLoading(false);
      },
      () => {
        setLocationError(
          "Unable to get your location. Please allow location access."
        );

        setLocationLoading(false);
      }
    );
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!userLocation) {
      setError(true);
      setMessage(
        "Please detect your current location first."
      );
      return;
    }

    try {
      await api.post("/ambulances", {
        ...form,
        latitude: userLocation[0],
        longitude: userLocation[1],
        ambulanceId:
          recommendedAmbulance?.id || "",
      });

      setMessage(
        `Ambulance request received. ${
          recommendedAmbulance
            ? `${recommendedAmbulance.name} has been recommended.`
            : ""
        }`
      );

      setError(false);

      load();
    } catch (err) {
      setError(true);

      setMessage(
        err.response?.data?.message ||
          "Could not send ambulance request."
      );
    }
  };

  const defaultMapPosition = [
    28.6139,
    77.2090,
  ];

  return (
    <div className="ambulance-page">

      {/* =================================
          HEADER
      ================================= */}

      <section className="ambulance-header">

        <div className="container">

          <div className="ambulance-header-content">

            <div>

              <div className="emergency-page-badge">
                <AlertTriangle size={14} />
                EMERGENCY SUPPORT
              </div>

              <h1>
                Get help when
                <span> you need it.</span>
              </h1>

              <p>
                Detect your location and find the nearest
                available Sanjeevni ambulance.
              </p>

            </div>

            <div className="ambulance-header-icon">
              <AmbulanceIcon size={48} />
            </div>

          </div>

        </div>

      </section>


      {/* =================================
          MAIN
      ================================= */}

      <main className="container ambulance-content">

        <div className="emergency-warning">

          <div className="warning-icon">
            <AlertTriangle size={19} />
          </div>

          <div>
            <strong>
              For life-threatening emergencies
            </strong>

            <p>
              Also contact your local emergency number
              for immediate assistance.
            </p>
          </div>

        </div>


        <div className="ambulance-grid">

          {/* =================================
              MAP
          ================================= */}

          <section className="ambulance-map-card">

            <div className="ambulance-card-header">

              <div>

                <h2>
                  Ambulance Locations
                </h2>

                <p>
                  Find available ambulances near you.
                </p>

              </div>

              <div className="map-status">
                <span></span>
                Live Map
              </div>

            </div>


            <div className="ambulance-map-wrapper">

              <MapContainer
                center={defaultMapPosition}
                zoom={12}
                style={{
                  height: "430px",
                  width: "100%",
                }}
              >

                <TileLayer
                  attribution="&copy; OpenStreetMap contributors"
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <MapController
                  location={userLocation}
                />

                {userLocation && (
                  <Marker position={userLocation}>

                    <Popup>

                      <strong>
                        Your Location
                      </strong>

                      <br />

                      Ambulance pickup location

                    </Popup>

                  </Marker>
                )}

                {ambulances.map((ambulance) => (

                  <Marker
                    key={ambulance.id}
                    position={ambulance.position}
                    icon={ambulanceIcon}
                  >

                    <Popup>

                      <strong>
                        {ambulance.name}
                      </strong>

                      <br />

                      Status: {ambulance.status}

                    </Popup>

                  </Marker>

                ))}

                {userLocation &&
                  recommendedAmbulance && (

                    <Polyline
                      positions={[
                        userLocation,
                        recommendedAmbulance.position,
                      ]}
                    />

                  )}

              </MapContainer>

            </div>


            <div className="map-legend">

              <div>
                <span className="legend-dot user"></span>
                Your location
              </div>

              <div>
                <span className="legend-dot ambulance"></span>
                Available ambulance
              </div>

            </div>

          </section>


          {/* =================================
              REQUEST FORM
          ================================= */}

          <section className="ambulance-request-card">

            <div className="request-card-heading">

              <div className="request-icon">
                <AmbulanceIcon size={21} />
              </div>

              <div>
                <h2>
                  Request Ambulance
                </h2>

                <p>
                  Complete the details below.
                </p>
              </div>

            </div>


            <Message
              text={message}
              error={error}
            />


            {/* Detect location */}

            <button
              type="button"
              className="location-button"
              onClick={getLocation}
              disabled={locationLoading}
            >

              <Navigation size={16} />

              {locationLoading
                ? "Detecting location..."
                : "Detect My Current Location"}

            </button>


            {locationError && (
              <p className="location-error">
                {locationError}
              </p>
            )}


            {userLocation && (

              <div className="detected-location">

                <div className="detected-location-icon">
                  <MapPin size={17} />
                </div>

                <div>

                  <strong>
                    Location detected
                  </strong>

                  <span>
                    {userLocation[0].toFixed(5)},
                    {" "}
                    {userLocation[1].toFixed(5)}
                  </span>

                </div>

              </div>

            )}


            <form
              className="ambulance-form"
              onSubmit={submit}
            >

              {/* Pickup location */}

              <label>

                <span>
                  Pickup Location
                </span>

                <div className="ambulance-input">

                  <MapPin size={16} />

                  <input
                    required
                    placeholder="Detect your location or enter an address"
                    value={form.location}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        location: e.target.value,
                      })
                    }
                  />

                </div>

              </label>


              {/* Emergency type */}

              <label>

                <span>
                  Emergency Type
                </span>

                <div className="ambulance-input">

                  <AlertTriangle size={16} />

                  <select
                    value={form.emergencyType}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        emergencyType:
                          e.target.value,
                      })
                    }
                  >

                    <option>
                      Medical emergency
                    </option>

                    <option>
                      Accident
                    </option>

                    <option>
                      Pregnancy
                    </option>

                    <option>
                      Other
                    </option>

                  </select>

                </div>

              </label>


              {/* Phone */}

              <label>

                <span>
                  Contact Phone
                </span>

                <div className="ambulance-input">

                  <Phone size={16} />

                  <input
                    type="tel"
                    required
                    placeholder="Enter contact number"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        phone: e.target.value,
                      })
                    }
                  />

                </div>

              </label>


              {/* Recommended ambulance */}

              {recommendedAmbulance && (

                <div className="recommended-ambulance">

                  <div className="recommended-top">

                    <span className="eyebrow">
                      RECOMMENDED
                    </span>

                    <span className="recommended-status">
                      <span></span>
                      Available
                    </span>

                  </div>

                  <h3>
                    {recommendedAmbulance.name}
                  </h3>

                  <div className="recommended-meta">

                    <span>
                      <MapPin size={13} />
                      {recommendedAmbulance.distance} km away
                    </span>

                    <span>
                      <CheckCircle2 size={13} />
                      Available
                    </span>

                  </div>

                </div>

              )}


              <button
                className="emergency-submit"
                disabled={!userLocation}
              >

                <AmbulanceIcon size={18} />

                Request Ambulance

                <ArrowRight size={16} />

              </button>

            </form>


            <div className="emergency-form-note">

              <Clock3 size={14} />

              <span>
                Detect your location before submitting
                an ambulance request.
              </span>

            </div>

          </section>

        </div>


        {/* =================================
            REQUEST HISTORY
        ================================= */}

        <section className="ambulance-history">

          <div className="history-header">

            <div>

              <div className="history-title">

                <History size={19} />

                <h2>
                  Request History
                </h2>

              </div>

              <p>
                Your previous ambulance requests.
              </p>

            </div>

            <span className="history-count">
              {items.length}
            </span>

          </div>


          {items.length === 0 ? (

            <div className="history-empty">

              <div>
                <AmbulanceIcon size={24} />
              </div>

              <h3>
                No ambulance requests
              </h3>

              <p>
                Your ambulance request history
                will appear here.
              </p>

            </div>

          ) : (

            <div className="ambulance-history-list">

              {items.map((item) => (

                <div
                  className="ambulance-history-item"
                  key={item._id}
                >

                  <div className="history-item-icon">
                    <AmbulanceIcon size={18} />
                  </div>

                  <div className="history-item-info">

                    <strong>
                      {item.emergencyType}
                    </strong>

                    <span>
                      {item.location}
                    </span>

                  </div>

                  <span className="history-status">
                    {item.status}
                  </span>

                </div>

              ))}

            </div>

          )}

        </section>

      </main>

    </div>
  );
}