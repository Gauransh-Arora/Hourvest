import React, { useState } from "react";
import axios from "axios"; // for sending requests
import "./auth.css"; // styles for login/signup

const Login = () => {
  // 1. Create state variables to store form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 2. When the form is submitted
  const handleLogin = async (e) => {
    e.preventDefault(); // stop page refresh

    try {
      // 3. Send data to backend API
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      // 4. If login works, store token in localStorage
      localStorage.setItem("token", res.data.token);

      // 5. Redirect user to profile/dashboard
      window.location.href = "/profile";

    } catch (err) {
      // 6. Show alert if login failed
      alert("Login failed: " + (err.response?.data?.message || "Try again later"));
    }
  };

  return (
    <div className="auth-container">
      <h2>Login to Borrowed Time</h2>

      {/* Login form */}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email} // connects input to state
          onChange={(e) => setEmail(e.target.value)} // updates state
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>

      <p>
        Don't have an account? <a href="/signup">Sign up</a>
      </p>
    </div>
  );
};

export default Login;
