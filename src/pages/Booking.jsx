import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/Booking.css";
import { db, auth } from "../firebaseConfig";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const selectedService = location.state?.service || "General Assessment";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    vehicle: "",
    service: selectedService,
    date: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = auth.currentUser;
      const userId = user ? user.uid : "guest";

      await addDoc(collection(db, "bookings"), {
        ...formData,
        userId,
        status: "pending",
        createdAt: serverTimestamp(),
      });

      alert("Booking confirmed successfully!");
      navigate("/booking-confirmation", { state: formData });
    } catch (error) {
      console.error("Error saving booking:", error);
      alert("Failed to save booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-page">
      {/* Header */}
      <div className="booking-header">
        <Link to={-1} className="back-btn">
          ← Back
        </Link>
        <h1 className="booking-title">Book Appointment</h1>
      </div>

      {/* Selected Service Display */}
      <p className="selected-service">
        {selectedService === "General Assessment" ? (
          <>
            Booking a <strong>General Vehicle Assessment</strong> — we'll inspect
            your vehicle to identify needed repairs or enhancements.
          </>
        ) : (
          <>
            Booking for: <strong>{selectedService}</strong>
          </>
        )}
      </p>

      {/* Booking Form */}
      <form className="booking-form" onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <input
          name="vehicle"
          placeholder="Vehicle Type (e.g., Toyota Camry)"
          value={formData.vehicle}
          onChange={handleChange}
        />

        <select
          name="service"
          value={formData.service}
          onChange={handleChange}
          required
        >
          <option value="">Select Service Type</option>
          <option value="Repair">Repair</option>
          <option value="Enhancement">Enhancement</option>
          <option value="General Assessment">General Assessment</option>
        </select>

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <textarea
          name="notes"
          placeholder={`Additional notes about your ${formData.service.toLowerCase()}...`}
          value={formData.notes}
          onChange={handleChange}
        ></textarea>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Submitting..." : "Confirm Booking"}
        </button>
      </form>
    </div>
  );
};

export default Booking;
