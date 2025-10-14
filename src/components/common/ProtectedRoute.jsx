import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const user = auth.currentUser;
      if (!user) {
        setIsAuthorized(false);
        setLoading(false);
        return;
      }

      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const role = docSnap.data().role;
          setIsAuthorized(allowedRoles.includes(role));
        } else {
          setIsAuthorized(false);
        }
      } catch (err) {
        console.error("Error checking user role:", err);
        setIsAuthorized(false);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, [allowedRoles]);

  if (loading) return <p>Loading...</p>;

  if (!isAuthorized) return <Navigate to="/login" />;

  return children;
};

export default ProtectedRoute;
