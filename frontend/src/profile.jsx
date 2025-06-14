import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("🔐 Profile page token:", token);

    if (!token) {
      console.log("❌ No token found. Redirecting to login.");
      window.location.href = "/";
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/userRoutes/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data)); // ✅ Save user to localStorage for ChatPage
      } catch (err) {
        console.error("Error fetching profile:", err);
        alert("Session expired. Please log in again.");
        localStorage.removeItem("token");
        window.location.href = "/";
      }
    };

    fetchProfile();
  }, []);

  if (!user) return <p>Loading profile...</p>;

  return (
    <div style={styles.container}>
      <h2>Welcome back, {user.name}!</h2>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Minits:</strong> {user.minits || 0}
      </p>

      <button
        style={styles.logoutBtn}
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          window.location.href = "/";
        }}
      >
        Logout
      </button>

      <button style={styles.chatBtn} onClick={() => navigate("/Home")}>
        Go to Home
      </button>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "100px auto",
    padding: "30px",
    backgroundColor: "#132a4f",
    color: "white",
    borderRadius: "10px",
    textAlign: "center",
    border: "1px solid #facc15",
    boxShadow: "0 0 15px rgba(255, 255, 0, 0.1)",
    fontFamily: "'Segoe UI', Tahoma, sans-serif",
  },
  logoutBtn: {
    marginTop: "20px",
    padding: "10px 20px",
    background: "linear-gradient(to right, #ff4d4d, #ff9999)",
    color: "#000",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  chatBtn: {
    marginTop: "10px",
    padding: "10px 20px",
    background: "linear-gradient(to right, #22c55e, #7efc7e)",
    color: "#000",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
};

export default Profile;
