import React from "react";
import { Link } from "react-router-dom";
import enhancementServices from "../data/enhancementServicesData";
import "../styles/Enhancement.css";

const Enhancement = () => {
  return (
    <div className="enhancement-page">
      {/* Back to Home Button */}
      <div className="back-btn-container">
        <Link to="/" className="back-btn">← Home</Link>
      </div>

      <div className="enhancement-text">
        <h1 className="enhancement-title">Enhancement</h1>
        <p className="enhancement-intro">
          Upgrade your ride’s appearance and performance.
        </p>
      </div>

      <div className="enhancement-services">
        {enhancementServices.map((service) => (
          <div className="service-card" key={service.id}>
            <img
              src={service.image}
              alt={service.title}
              className="service-image"
            />
            <h3 className="service-title">{service.title}</h3>
            <p className="service-price">{service.price}</p>
            <Link to="/booking" state={{ service: service.title }} className="book-btn">
              Book Appointment
            </Link>

          </div>
        ))}
      </div>

      <div className="general-booking">
        <p>Need help deciding?</p>
        <Link to="/booking" state={{ service: "General Assessment" }} className="general-btn">
          Book a General Assessment
        </Link>

      </div>
    </div>
  );
};

export default Enhancement;
