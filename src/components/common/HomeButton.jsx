// components/common/HomeButton.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../../styles/HomeButton.css";

const HomeButton = () => {
  return (
    <Link to="/" className="home-btn">
      ⟵ Home
    </Link>
  );
};

export default HomeButton;
