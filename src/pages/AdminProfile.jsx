import React, { useEffect, useState } from "react";
import { db, auth } from "../firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import "../styles/AdminDashboard.css";

const AdminProfile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const userId = auth.currentUser.uid;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setProfile({
            name: data.name || "",
            email: data.email || "",
            phone: data.phone || "",
          });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  const handleChange = (e) => {
    setProfile((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async () => {
    setUpdating(true);
    try {
      const docRef = doc(db, "users", userId);
      await updateDoc(docRef, {
        name: profile.name,
        phone: profile.phone,
      });
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <p>Loading profile...</p>;

  return (
    <div className="admin-profile">
      <h2>My Profile</h2>
      <div className="profile-container">
        <div className="profile-left">
          <div className="avatar">{profile.name.charAt(0).toUpperCase()}</div>
          <h3>{profile.name}</h3>
          <p className="role">Admin</p>
        </div>

        <div className="profile-right">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
          />

          <label>Email</label>
          <input type="email" value={profile.email} disabled />

          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
          />

          <button onClick={handleUpdate} disabled={updating}>
            {updating ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
