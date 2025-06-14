import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Mail, Clock,User } from "lucide-react";
import "./profile.css";

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
        localStorage.setItem("user", JSON.stringify(res.data));
      } catch (err) {
        console.error("Error fetching profile:", err);
        alert("Session expired. Please log in again.");
        localStorage.removeItem("token");
        window.location.href = "/";
      }
    };

    fetchProfile();
  }, []);

  if (!user) return <p className="profile-loading">Loading profile...</p>;

  return (
    <div className="profile-page">
      <div className="profile-banner">
        <h1 className="profile-welcome">🌟 Welcome, {user.name}!</h1>
        <p className="profile-subtitle">Here’s your dashboard overview</p>
      </div>

      <div className="profile-content">

        <div className="profile-detail">
          < User size={20} className="profile-icon" />
          <span>{user.username}</span>
        </div>
        <div className="profile-detail">
          <Mail size={20} className="profile-icon" />
          <span>{user.email}</span>
        </div>
        <div className="profile-detail">
          <Clock size={20} className="profile-icon" />
          <span>{user.minits || 0} Minits</span>
        </div>

        <div className="profile-actions">
          <button
            className="profile-button logout"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              window.location.href = "/";
            }}
          >
            Logout
          </button>

          <button  onClick={() => navigate("/Home")}>
        Go to Home
      </button>
        </div>
      </div>
     
    </div>
  );
};

export default Profile;
