import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import "../styles/CustomerDashboard.css";

const CustomerDashboard = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "bookings"));
        const bookingsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBookings(bookingsList);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2>Welcome back 👋</h2>
        <p>Manage your bookings and explore our services</p>
      </header>

      <section className="dashboard-actions">
        <button
          onClick={() => (window.location.href = "/booking")}
          className="dashboard-btn"
        >
          Book a New Service
        </button>
      </section>

      <section className="dashboard-bookings">
        <h3>Your Bookings</h3>
        <div className="bookings-list">
          {bookings.length === 0 ? (
            <p>No bookings found.</p>
          ) : (
            bookings.map((booking) => (
              <div key={booking.id} className="booking-card">
                <h4>{booking.service}</h4>
                <p>
                  Status:{" "}
                  <span className={`status ${booking.status || "pending"}`}>
                    {booking.status || "Pending"}
                  </span>
                </p>
                <p>Date: {booking.date || "N/A"}</p>
                <p>Time: {booking.time || "N/A"}</p>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default CustomerDashboard;
