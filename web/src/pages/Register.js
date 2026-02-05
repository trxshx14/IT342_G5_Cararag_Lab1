import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../templates/Register.css";

function Register() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const text = await response.text();
      const data = text ? JSON.parse(text) : {};

      if (response.ok) {
        alert("Registration successful!");
        navigate("/login");
      } else {
        alert("Registration failed: " + (data.message || "Server error"));
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Could not connect to server.");
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={submit}>
        <h2>Register</h2>
        <input name="firstName" placeholder="First Name" onChange={handleChange} required />
        <input name="lastName" placeholder="Last Name" onChange={handleChange} required />
        <input name="userName" placeholder="Username" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required />
        
        <button type="submit" className="btn-primary">Create Account</button>
        
        <div className="divider"><span>OR</span></div>
        
        <button type="button" className="btn-secondary" onClick={() => navigate("/login")}>
          Back to Login
        </button>
      </form>
    </div>
  );
}

export default Register;