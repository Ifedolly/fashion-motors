import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import "../styles/AdminDashboard.css";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); 

  // Fetch all confirmed bookings (active services)
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "bookings"));
        const confirmedBookings = querySnapshot.docs
          .map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }))
          .filter((item) => item.status === "confirmed");

        setServices(confirmedBookings);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Filtered services list (NEW)
  const filteredServices = services.filter((service) => {
    if (filter === "all") return true;
    return (service.serviceStatus || "pending") === filter;
  });

  // Update service progress
  const handleStatusChange = async (serviceId, newStatus) => {
    try {
      const serviceRef = doc(db, "bookings", serviceId);
      await updateDoc(serviceRef, { serviceStatus: newStatus });

      setServices((prev) =>
        prev.map((s) =>
          s.id === serviceId ? { ...s, serviceStatus: newStatus } : s
        )
      );

      alert(`Service status updated to "${newStatus}"`);
    } catch (error) {
      console.error("Error updating service:", error);
      alert("Failed to update status");
    }
  };

  if (loading) return <p>Loading services...</p>;

  return (
    <div className="admin-services">
      <h3>Service Management</h3>

      {/* FILTER UI (NEW) */}
      <div className="filter-buttons">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("pending")}>Pending</button>
        <button onClick={() => setFilter("in-progress")}>In Progress</button>
        <button onClick={() => setFilter("done")}>Done</button>
      </div>

      {filteredServices.length === 0 ? (
        <p>No services found.</p>
      ) : (
        <div className="bookings-list">
          {filteredServices.map((service) => (
            <div key={service.id} className="booking-card">
              <h4>{service.service}</h4>

              <p><strong>Customer:</strong> {service.name || "N/A"}</p>
              <p><strong>Vehicle:</strong> {service.vehicle || "N/A"}</p>
              <p><strong>Date:</strong> {service.date || "N/A"}</p>

              <p>
                <strong>Current Status:</strong>{" "}
                {service.serviceStatus || "pending"}
              </p>

              <select
                value={service.serviceStatus || "pending"}
                onChange={(e) => handleStatusChange(service.id, e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminServices;
