import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import "../styles/AdminDashboard.css";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const q = query(collection(db, "bookings"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => {
        const info = doc.data();

        return {
          id: doc.id,
          fullName: info.fullName || info.name || "Unknown User",
          email: info.email || "No email",
          service:
            info.service ||
            info.serviceName ||
            info.serviceType ||
            "Not specified",
          date:
            info.date ||
            (info.createdAt && info.createdAt.toDate().toLocaleDateString()) ||
            "No date",
          vehicle: info.vehicle || "Not provided",
          status: (info.status || "pending").toLowerCase(),
        };
      });

      setBookings(data);
    });

    return () => unsubscribe();
  }, []);

  const filteredBookings = bookings.filter((b) => {
    if (filter === "all") return true;
    return b.status === filter;
  });

  return (
    <div className="admin-bookings">
      <h2>Bookings</h2>
      <p>Manage all service bookings here</p>

      {/* Filter Buttons */}
      <div className="filter-buttons">
        {["all", "pending", "confirmed", "rejected"].map((status) => (
          <button
            key={status}
            className={`filter-btn ${filter === status ? "active" : ""}`}
            onClick={() => setFilter(status)}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      <div className="bookings-list">
        {filteredBookings.length > 0 ? (
          filteredBookings.map((booking) => (
            <div key={booking.id} className="booking-card">
              <h4>{booking.service}</h4>

              <p>
                <strong>Customer:</strong> {booking.fullName}
              </p>

              <p>
                <strong>Date:</strong> {booking.date}
              </p>

              <p>
                <strong>Vehicle:</strong> {booking.vehicle}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                <span className={`status ${booking.status}`}>
                  {booking.status}
                </span>
              </p>
            </div>
          ))
        ) : (
          <p>No {filter} bookings found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminBookings;
