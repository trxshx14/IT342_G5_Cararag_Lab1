import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../templates/Profile.css";

function Profile() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/");

    fetch("http://localhost:8080/api/user/me", {
      headers: { Authorization: "Bearer " + token },
    })
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, [navigate]);

  return (
    <div className="container">
      <h2>Profile</h2>
      <p><b>Username:</b> {user.userName}</p>
      <p><b>Email:</b> {user.email}</p>
      <p><b>Name:</b> {user.firstName} {user.lastName}</p>
      <button onClick={() => navigate("/dashboard")}>Back</button>
    </div>
  );
}

export default Profile;
