import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../templates/Login.css";

function Login() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const text = await res.text();
      const data = text ? JSON.parse(text) : {};

      if (res.ok && data.token) {
        
        const cleanToken = data.token.replace(/['"]+/g, '');
        localStorage.setItem("token", cleanToken);
        console.log("Token saved successfully");
        navigate("/dashboard");
      } else {
        alert("Login failed: " + (data.message || "Check your username/password"));
      }
    } catch (error) {
      console.error("Connection Error:", error);
      alert("Backend is not responding. Is Spring Boot running on 8080?");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={submit}>
        <h2>Login</h2>
        <input name="userName" placeholder="Username" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit" className="btn-primary">Sign In</button>
        <div className="divider"><span>OR</span></div>
        <button type="button" className="btn-secondary" onClick={() => navigate("/")}>
          Register New Account
        </button>
      </form>
    </div>
  );
}

export default Login;