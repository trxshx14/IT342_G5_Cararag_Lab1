import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../templates/Profile.css";

function Profile() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: ""
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (!token) {
      console.warn("No token found, redirecting to login.");
      navigate("/login");
      return;
    }

    setLoading(true);
    fetch("http://localhost:8080/api/user/me", {
      method: "GET",
      headers: { 
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json"
      },
    })
      .then((res) => {
        if (!res.ok) {
          if (res.status === 401) {
            localStorage.removeItem("token");
            navigate("/login");
            throw new Error("Session expired. Please login again.");
          }
          throw new Error("Failed to fetch profile data");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Profile data received:", data);
        setUser({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          userName: data.userName || "",
          email: data.email || ""
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Profile fetch error:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [navigate]);

  const handleBack = () => {
    navigate("/dashboard");
  };

  if (loading) {
    return (
      <div className="profile-container">
        <div className="profile-card">
          <h2>Loading Profile...</h2>
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-container">
        <div className="profile-card">
          <h2>Error Loading Profile</h2>
          <p className="error-message">{error}</p>
          <button className="btn-primary" onClick={handleBack}>Back to Dashboard</button>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2 className="profile-title">Your Profile</h2>
        <p className="profile-subtitle">View and manage your account information</p>
        
        <div className="profile-info">
          <div className="info-group">
            <div className="info-row">
              <span className="info-label">First Name:</span>
              <span className="info-value">{user.firstName}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Last Name:</span>
              <span className="info-value">{user.lastName}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Username:</span>
              <span className="info-value">{user.userName}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Email:</span>
              <span className="info-value">{user.email}</span>
            </div>
          </div>
        </div>

        <div className="profile-actions">
          <button className="btn-primary" onClick={handleBack}>
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;