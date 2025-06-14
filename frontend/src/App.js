import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./login";
import Signup from "./signup";
import Profile from "./profile";
import PostTask from "./postTask";
import OAuthSuccess from "./OAuthSuccess";
import ChatPage from "./chat/ChatPage";
import Home from "./home";
import AIChatPage from "./aichat";


function App() {
  const user = JSON.parse(localStorage.getItem("user")); // Get user from localStorage

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/post-task" element={<PostTask />} />
        <Route path="/oauth-success" element={<OAuthSuccess />} />
        <Route path="/chat" element={<ChatPage user={user} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/aichat" element={<AIChatPage user={user} />} />
      </Routes>
    </Router>
  );
}

export default App;
