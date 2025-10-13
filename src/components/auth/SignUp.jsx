import React from "react";
import "../../styles/SignUp.css";

const SignUp = ({ onClose }) => {
  return (
    <div className="signup-overlay">
      <div className="signup-modal">
        <button className="close-btn" onClick={onClose}>✕</button>
        <h2>Create an Account</h2>
        <form className="signup-form">
          <input type="text" placeholder="Full Name" required />
          <input type="email" placeholder="Email Address" required />
          <input type="tel" placeholder="Phone Number" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
