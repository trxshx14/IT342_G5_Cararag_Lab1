import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../templates/Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
  
    const token = localStorage.getItem("token");
    
    if (!token) {
      console.warn("No token found, redirecting to login.");
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <div className="welcome-section">
          <h1 className="welcome-title">Welcome!</h1>
          <p className="welcome-message">You've successfully logged in to your account.</p>
          <div className="welcome-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        <div className="dashboard-buttons">
          <button 
            className="btn-profile" 
            onClick={() => navigate("/profile")}
          >
            <span className="button-icon">👤</span>
            Go to Profile
          </button>
          
          <button 
            className="btn-logout" 
            onClick={handleLogout}
          >
            <span className="button-icon">🚪</span>
            Logout
          </button>
        </div>

        <div className="dashboard-footer">
          <p className="footer-text">Manage your account settings and preferences</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;