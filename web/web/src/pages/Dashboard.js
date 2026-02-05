import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../templates/Dashboard.css";

function Dashboard() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/");

    fetch("http://localhost:8080/api/user/me", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Username: {user.userName}</p>
      <p>Email: {user.email}</p>
      <p>Name: {user.firstName} {user.lastName}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Dashboard;
