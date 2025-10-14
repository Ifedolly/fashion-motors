import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import "../styles/CustomerDashboard.css"; // can reuse the same CSS

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "bookings"));
        const allBookings = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBookings(allBookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2>Admin Dashboard 👨‍💼</h2>
        <p>View all bookings in the system</p>
      </header>

      <section className="dashboard-bookings">
        <h3>All Bookings</h3>

        {loading ? (
          <p>Loading bookings...</p>
        ) : bookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          <div className="bookings-list">
            {bookings.map((booking) => (
              <div key={booking.id} className="booking-card">
                <h4>{booking.service}</h4>
                <p>
                  Customer: {booking.fullName} ({booking.email})
                </p>
                <p>
                  Status:{" "}
                  <span className={`status ${booking.status || "pending"}`}>
                    {booking.status || "Pending"}
                  </span>
                </p>
                <p>Date: {booking.date || "N/A"}</p>
                <p>Vehicle: {booking.vehicle || "N/A"}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminDashboard;
