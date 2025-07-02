import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BASE_URL } from "../config/config";
import axios from "axios";

function ProtectedRoute({ children }) {
  const [isAllowed, setIsAllowed] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setIsAllowed(false);
      return;
    }

    const verifyToken = async () => {
      try {
        const { status } = await axios.get(`${BASE_URL}/api/v1/user/me`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });

        setIsAllowed(status === 200);
      } catch (err) {
        setIsAllowed(false);
      }
    };

    verifyToken();
  }, [token]);

  if (isAllowed === null) {
    return <div>Loading...</div>;
  }

  if (!isAllowed) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}

export default ProtectedRoute;
