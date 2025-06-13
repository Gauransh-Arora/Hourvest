// src/chat/ChatList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const ChatList = ({ user, setCurrentChat }) => {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const fetchConversations = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Session expired. Please log in again.");
        window.location.href = "/";
        return;
      }

      try {
        const res = await axios.get(
          "http://localhost:5000/api/chat/conversations",
          {
            headers: {
              Authorization: `Bearer ${token}`, // ✅ Include token here
            },
            withCredentials: true,
          }
        );
        setConversations(res.data);
      } catch (err) {
        console.error("❌ Error fetching conversations:", err);
        alert("Unauthorized. Please log in again.");
        localStorage.removeItem("token");
        window.location.href = "/";
      }
    };

    fetchConversations();
  }, []);

  return (
    <div style={{ width: "30%", borderRight: "1px solid #ccc" }}>
      <h3>Your Conversations</h3>
      {conversations.map((conv) => {
        const friend = conv.members.find((m) => m._id !== user._id);
        return (
          <div key={conv._id} onClick={() => setCurrentChat(conv)}>
            <p>{friend?.username}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ChatList;
