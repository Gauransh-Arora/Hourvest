// src/pages/OAuthSuccess.jsx

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function OAuthSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const token = query.get("token");

    if (token) {
      localStorage.setItem("token", token);
      // Redirect to profile or dashboard
      navigate("/profile");
    } else {
      navigate("/login");
    }
  }, []);

  return <p>Redirecting...</p>;
}

export default OAuthSuccess;
