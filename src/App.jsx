import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// Layout
import Navbar from "./components/layout/Navbar";

// Pages
import Hero from "./pages/Hero";
import Repair from "./pages/Repair";
import Enhancement from "./pages/Enhancement";
import Booking from "./pages/Booking";
import BookingConfirmation from "./pages/BookingConfirmation";

const App = () => {
  const location = useLocation();

  // Show Navbar only on homepage
  const showNavbar = location.pathname === "/";

  return (
    <div className="app">
      {showNavbar && <Navbar />}

      <main style={{ minHeight: "80vh" }}>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/services/repair" element={<Repair />} />
          <Route path="/services/enhancement" element={<Enhancement />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/booking-confirmation" element={<BookingConfirmation />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
