import React, { useEffect, useState } from "react";
import { db, auth } from "../firebaseConfig";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import HomeButton from "../components/common/HomeButton";
import "../styles/CustomerDashboard.css";

const CustomerDashboard = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    // Firestore query for this user’s bookings
    const q = query(collection(db, "bookings"), where("email", "==", user.email));

    // Real-time listener
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const userBookings = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBookings(userBookings);
    });

    
    return () => unsubscribe();
  }, []);

  return (

    <div className="dashboard-container">
      <div className="dashboard-topbar">
        <HomeButton />
      </div>
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
                <p>Vehicle: {booking.vehicle || "N/A"}</p>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default CustomerDashboard;
