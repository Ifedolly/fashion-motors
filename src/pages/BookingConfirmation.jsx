import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/BookingConfirmation.css";

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state || {};

  const handleBack = () => {
    navigate("/customer-dashboard", { replace: true });
  };

  return (
    <div className="confirmation-page">
      <h1 className="confirmation-title">Booking Confirmed!</h1>
      <p className="confirmation-message">
        Thank you {booking.name ? booking.name : "Guest"}! <br />
        Your appointment for{" "}
        <strong>{booking.service || "General Assessment"}</strong> has been
        successfully booked.
      </p>

      {booking.date && (
        <p className="confirmation-date">
          📅 Appointment Date: <strong>{booking.date}</strong>
        </p>
      )}

      <p className="confirmation-note">
        Our team will contact you shortly with further details.
      </p>

      <div className="confirmation-actions">
        <button onClick={handleBack} className="home-btn">
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default BookingConfirmation;
