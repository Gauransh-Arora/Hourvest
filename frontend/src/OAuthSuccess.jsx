import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function OAuthSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
  const query = new URLSearchParams(window.location.search);
  const token = query.get("token");

  console.log("Token from query:", token);

  if (token) {
    localStorage.setItem("token", token);
    console.log("✅ Saved token in localStorage:", localStorage.getItem("token"));

    setTimeout(() => {
      navigate("/profile", { replace: true });
    }, 100);
  } else {
    console.log("❌ No token found in query");
    navigate("/", { replace: true });
  }
}, []);


  return <p>Redirecting...</p>;
}

export default OAuthSuccess;
