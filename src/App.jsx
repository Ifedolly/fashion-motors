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
import ProtectedRoute from "./components/common/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import StaffDashboard from "./pages/StaffDashboard";

//Auth
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";

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
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/staff-dashboard"
            element={
              <ProtectedRoute allowedRoles={["staff"]}>
                <StaffDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer-dashboard"
            element={
              <ProtectedRoute allowedRoles={["customer"]}>
                <CustomerDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;
