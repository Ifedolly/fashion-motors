import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/BookingConfirmation.css";

const BookingConfirmation = () => {
  const location = useLocation();
  const booking = location.state || {};

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
        <Link to="/" className="home-btn">Back to Home</Link>
      </div>
    </div>
  );
};

export default BookingConfirmation;
