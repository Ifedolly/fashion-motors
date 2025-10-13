import React from "react";
import { Link } from "react-router-dom";
import repairServices from "../data/repairServicesData";
import "../styles/Repair.css";

const Repair = () => {
  return (
    <div className="repair-page">
      {/* Header Section */}

        <Link to="/" className="back-btn">← Home</Link>

        <div className="repair-text">
          <h1 className="repair-title">Repair</h1>
          <p className="repair-intro">Book a diagnostic appointment with us today.</p>
        </div>


      <div className="repair-services">
        {repairServices.map((service) => (
          <div className="service-card" key={service.id}>
            <img
              src={service.image}
              alt={service.title}
              className="service-image"
            />
            <h3 className="service-title">{service.title}</h3>
            <p className="service-price">{service.price}</p>
            <Link 
              to="/booking" 
              state={{ service: "Repair" }} 
              className="book-btn"
            >
  Book Appointment
</Link>
          </div>
        ))}
      </div>

      <div className="general-booking">
        <p>Not sure what’s wrong?</p>
        <Link to="/booking" className="general-btn">
          Book a General Assessment
        </Link>
      </div>
    </div>
  );
};

export default Repair;
