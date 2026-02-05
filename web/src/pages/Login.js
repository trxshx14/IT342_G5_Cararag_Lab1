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

      if (res.ok) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        alert("Login failed: " + (data.message || "Invalid credentials"));
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Could not connect to the server.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={submit}>
        <h2>Login</h2>
        <input 
          name="userName" 
          placeholder="Username" 
          onChange={handleChange} 
          required 
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          onChange={handleChange} 
          required 
        />
        
        <button type="submit" className="btn-primary">Sign In</button>
        
        <div className="divider"><span>OR</span></div>
        
        <button 
          type="button" 
          className="btn-secondary" 
          onClick={() => navigate("/")}
        >
          Don't have an account? Register
        </button>
      </form>
    </div>
  );
}

export default Login;