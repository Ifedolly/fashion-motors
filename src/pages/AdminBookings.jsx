import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import "../styles/AdminDashboard.css"; // make sure this is imported

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

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

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      setUpdating(true);
      const bookingRef = doc(db, "bookings", bookingId);
      await updateDoc(bookingRef, { status: newStatus });

      setBookings((prev) =>
        prev.map((b) =>
          b.id === bookingId ? { ...b, status: newStatus } : b
        )
      );
    } catch (error) {
      console.error("Error updating booking status:", error);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="admin-bookings">
      <h2>All Bookings</h2>
      <p>Approve or reject customer bookings below.</p>

      {loading ? (
        <p>Loading bookings...</p>
      ) : bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="bookings-grid">
          {bookings.map((b) => (
            <div key={b.id} className="booking-card">
              <h3>{b.service || "Service not specified"}</h3>
              <p>
                <strong>Customer:</strong> {b.fullName} ({b.email})
              </p>
              <p>
                <strong>Date:</strong> {b.date || "N/A"}
              </p>
              <p>
                <strong>Vehicle:</strong> {b.vehicle || "N/A"}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`status-text ${
                    b.status === "confirmed"
                      ? "status-confirmed"
                      : b.status === "rejected"
                      ? "status-rejected"
                      : "status-pending"
                  }`}
                >
                  {b.status || "Pending"}
                </span>
              </p>

              {b.status !== "confirmed" && b.status !== "rejected" && (
                <div className="btn-container">
                  <button
                    onClick={() => handleStatusChange(b.id, "confirmed")}
                    className="confirm-btn"
                    disabled={updating}
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => handleStatusChange(b.id, "rejected")}
                    className="reject-btn"
                    disabled={updating}
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminBookings;
