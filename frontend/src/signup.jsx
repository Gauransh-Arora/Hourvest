import React, { useState } from "react";
import axios from "axios";
import "./auth.css";

const Signup = () => {
  // store user input
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // form submit handler
  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      // send signup data to backend
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        username,
        email,
        password,
      });

      // store token if signup is successful
      localStorage.setItem("token", res.data.token);

      // redirect to profile/dashboard
      window.location.href = "/profile";

    } catch (err) {
      alert("Signup failed: " + (err.response?.data?.message || "Try again later"));
    }
  };

  return (
    <div className="auth-container">
      <h2>Join Borrowed Time</h2>

      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Full Name"
          value={username}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Sign Up</button>
      </form>

      <p>Already have an account? <a href="/login">Log in</a></p>
    </div>
  );
};

export default Signup;
