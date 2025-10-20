import React, { useState } from "react";
import "../styles/AdminDashboard.css";
import AdminOverview from "./AdminOverview";
import AdminBookings from "./AdminBookings";
import AdminServices from "./AdminServices";
import AdminProfile from "./AdminProfile";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <AdminOverview />;
      case "bookings":
        return <AdminBookings />;
      case "services":
        return <AdminServices />;
      case "profile":
        return <AdminProfile />;
      default:
        return <AdminOverview />;
    }
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li
            className={activeTab === "overview" ? "active" : ""}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </li>
          <li
            className={activeTab === "bookings" ? "active" : ""}
            onClick={() => setActiveTab("bookings")}
          >
            Bookings
          </li>
          <li
            className={activeTab === "services" ? "active" : ""}
            onClick={() => setActiveTab("services")}
          >
            Services
          </li>
          <li
            className={activeTab === "profile" ? "active" : ""}
            onClick={() => setActiveTab("profile")}
          >
            Profile
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="dashboard-content">{renderContent()}</main>
    </div>
  );
};

export default AdminDashboard;
