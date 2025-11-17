import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";

const AdminOverview = () => {
  const [stats, setStats] = useState({
    totalBookings: 0,
    confirmed: 0,
    pending: 0,
    rejected: 0,
    totalServices: 0,
  });

  useEffect(() => {
    // Listen for real-time updates on bookings
    const unsubscribeBookings = onSnapshot(collection(db, "bookings"), (snapshot) => {
      const bookingsData = snapshot.docs.map((doc) => doc.data());

      const confirmed = bookingsData.filter((b) => b.status === "confirmed").length;
      const pending = bookingsData.filter((b) => !b.status || b.status === "pending").length;
      const rejected = bookingsData.filter((b) => b.status === "rejected").length;

      // Total Services = confirmed bookings
      const totalServices = confirmed;

      setStats({
        totalBookings: snapshot.size,
        confirmed,
        pending,
        rejected,
        totalServices,
      });
    });

    return () => unsubscribeBookings();
  }, []);


  return (
    <div className="admin-overview">
      <h2>Dashboard Overview</h2>
      <p>Quick summary of system activity</p>

      <div className="overview-grid">
        <div className="overview-card">
          <h3>{stats.totalBookings}</h3>
          <p>Total Bookings</p>
        </div>
        <div className="overview-card confirmed">
          <h3>{stats.confirmed}</h3>
          <p>Confirmed</p>
        </div>
        <div className="overview-card pending">
          <h3>{stats.pending}</h3>
          <p>Pending</p>
        </div>
        <div className="overview-card rejected">
          <h3>{stats.rejected}</h3>
          <p>Rejected</p>
        </div>
        <div className="overview-card">
          <h3>{stats.totalServices}</h3>
          <p>Total Services</p>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
