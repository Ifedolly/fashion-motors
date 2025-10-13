import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Hero.css";

const Hero = () => {
  const navigate = useNavigate();

  const handleClick = (type) => {
    if (type === "repair") {
      navigate("/services/repair");
    } else if (type === "enhancement") {
      navigate("/services/enhancement");
    }
  };

  return (
    <div className="hero">
      <video
        className="hero-video"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/videos/car1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="hero-overlay">
        <button className="cta-btn" onClick={() => handleClick("repair")}>
          Repair
        </button>
        <button className="cta-btn" onClick={() => handleClick("enhancement")}>
          Enhancement
        </button>
      </div>
    </div>
  );
};

export default Hero;
