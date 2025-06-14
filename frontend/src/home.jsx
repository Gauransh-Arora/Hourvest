import React, { useEffect, useState } from "react";

import "./HomePage.css";

import { Plus } from "lucide-react";

export default function HomePage() {
  const [tasks, setTasks] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const [loadingChatId, setLoadingChatId] = useState(null);

  useEffect(() => {
    if (!user) {
      alert("Please login first.");
      window.location.href = "/login";
    }
  }, [user]); // 👈 include `user` here

  useEffect(() => {
    const getTasks = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/tasks");

        const data = await res.json();

        setTasks(data);
      } catch (err) {
        console.error("Failed to fetch tasks:", err);
      }
    };

    getTasks();
  }, []);

  const handleChat = async (receiverId) => {
    if (!receiverId || receiverId === user?._id) {
      alert("Cannot chat with yourself.");
      return;
    }

    try {
      setLoadingChatId(receiverId); // Optional: show loading
      const res = await fetch("http://localhost:5000/api/chat/conversations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ receiverId }),
      });

      const data = await res.json();
      window.location.href = `/chat?conversationId=${data._id}`;
    } catch (err) {
      console.error("Error initiating chat:", err);
    } finally {
      setLoadingChatId(null);
    }
  };

  return (
    <div className="homepage">
      {/* Navbar */}

      <nav className="navbar">
        <h1 className="logo">Hourvest</h1>

        <button
          className="post-task-btn"
          onClick={() => (window.location.href = "/post-task")}
        >
          <Plus size={16} /> Post Task
        </button>
      </nav>

      {/* Hero Section */}

      <section className="banner">
        <h2>
          Welcome to <span>Hourvest</span> 🌟
        </h2>

        <p>
          Your time is valuable — earn rewards by helping others, or get things
          done fast by posting your own tasks.
        </p>
      </section>

      {/* Section Header */}

      <div className="section-header">
        <h3>🔥 Latest Tasks</h3>

        <span className="task-count">({tasks.length} tasks)</span>
      </div>

      {/* Task Feed */}

      <div className="task-feed">
        {tasks.length === 0 ? (
          <div className="empty">No tasks available yet 🚫</div>
        ) : (
          tasks.map((task) => (
            <div className="task-card" key={task._id}>
              <div className="task-media">
                {task.media?.length > 0 ? (
                  <video src={task.media[0]} controls />
                ) : (
                  <div className="no-media">No media provided 📭</div>
                )}
              </div>

              <div className="task-content">
                <h3>{task.title}</h3>

                <p>{task.description}</p>

                <div className="task-meta">
                  <span className="tag posted">
                    👤 {task.postedBy?.username || "Anonymous"}
                  </span>

                  <span className="tag time">⏱ {task.minits} minits</span>

                  <span className="tag field">
                    📂 {task.keywords?.field || "General"}
                  </span>

                  <span className="tag urgency">
                    🔥 {task.keywords?.urgency || "Normal"}
                  </span>

                  <button
                    className="msg-btn"
                    onClick={() => handleChat(task.postedBy._id)}
                    disabled={loadingChatId === task.postedBy._id}
                  >
                    {loadingChatId === task.postedBy._id
                      ? "⏳ Opening..."
                      : "💬 Chat"}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
