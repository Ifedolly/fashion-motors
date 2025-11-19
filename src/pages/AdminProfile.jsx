import React, { useEffect, useState } from "react";
import { db, auth } from "../firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import "../styles/AdminDashboard.css";

const AdminProfile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [changingPassword, setChangingPassword] = useState(false);

  const userId = auth.currentUser.uid;

  // Fetch profile from Firestore
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

  // Handle profile input change
  const handleChange = (e) => {
    setProfile((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Update profile info
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

  // Handle password form input change
  const handlePasswordChange = (e) => {
    setPasswordForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Update password
  const handlePasswordUpdate = async () => {
    const { currentPassword, newPassword, confirmPassword } = passwordForm;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return alert("All fields are required.");
    }

    if (newPassword !== confirmPassword) {
      return alert("New passwords do not match.");
    }

    setChangingPassword(true);

    try {
      const user = auth.currentUser;

      // Reauthenticate
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);

      // Update password
      await updatePassword(user, newPassword);
      alert("Password updated successfully!");

      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      console.error("Password update error:", error);
      alert(error.message);
    } finally {
      setChangingPassword(false);
    }
  };

  if (loading) return <p>Loading profile...</p>;

  return (
    <div className="admin-profile">
      <h2>My Profile</h2>
      <div className="profile-container">
        {/* Left section */}
        <div className="profile-left">
          <div className="avatar">{profile.name.charAt(0).toUpperCase()}</div>
          <h3>{profile.name}</h3>
          <p className="role">Admin</p>
        </div>

        {/* Right section */}
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

      {/* Change Password Section */}
      <div className="change-password-section">
        <h3>Change Password</h3>

        <label>Current Password</label>
        <input
          type="password"
          name="currentPassword"
          value={passwordForm.currentPassword}
          onChange={handlePasswordChange}
        />

        <label>New Password</label>
        <input
          type="password"
          name="newPassword"
          value={passwordForm.newPassword}
          onChange={handlePasswordChange}
        />

        <label>Confirm New Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={passwordForm.confirmPassword}
          onChange={handlePasswordChange}
        />

        <button onClick={handlePasswordUpdate} disabled={changingPassword}>
          {changingPassword ? "Updating..." : "Update Password"}
        </button>
      </div>
    </div>
  );
};

export default AdminProfile;
