import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../templates/Dashboard.css";

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    fetch("http://localhost:8080/api/user/me", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => setUser(data))
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!user) return <div className="loading">Loading profile...</div>;

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h2>User Dashboard</h2>
        <div className="info-group">
          <p><strong>Username:</strong> {user.userName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
        </div>
        <div className="dashboard-actions">
          <button className="btn-primary" onClick={() => navigate("/profile")}>My Profile</button>
          <button className="btn-danger" onClick={logout}>Logout</button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;