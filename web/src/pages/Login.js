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

    const res = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    localStorage.setItem("token", data.token);
    navigate("/dashboard");
  };

  return (
    <form onSubmit={submit}>
      <h2>Login</h2>
      <input name="userName" placeholder="Username" onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
