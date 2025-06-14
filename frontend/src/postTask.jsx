import React, { useState } from "react";
import { motion } from "framer-motion";
import "./posttask.css";

export default function PostTaskPage() {
  const [task, setTask] = useState({
    title: "",
    description: "",
    media: [],
    minits: 1,
    keywords: {
      field: "",
      urgency: "medium",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in task.keywords) {
      setTask({ ...task, keywords: { ...task.keywords, [name]: value } });
    } else {
      setTask({ ...task, [name]: value });
    }
  };

  const handleMediaChange = (e) => {
    const files = Array.from(e.target.files).map((file) =>
      URL.createObjectURL(file)
    );
    setTask({ ...task, media: files });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const token = localStorage.getItem("token");
  if (!token) {
    alert("You're not logged in!");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: task.title,
        description: task.description,
        mediaURL: task.media,
        minits: task.minits,
        keywords: task.keywords,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(`Error: ${data.message || "Something went wrong"}`);
      return;
    }

    alert("✅ Task posted to DB!");
    setTask({
      title: "",
      description: "",
      media: [],
      minits: 1,
      keywords: {
        field: "",
        urgency: "medium",
      },
    });
  } catch (error) {
    console.error("DB error:", error);
    alert("Internal server error");
  }
};


  return (
    <div className="post-task-wrapper">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="post-task-card"
      >
        <div className="post-task-content">
          <h2 className="post-task-title">Post a New Task</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title" className="post-task-label">Title</label>
              <input
                id="title"
                name="title"
                type="text"
                maxLength={100}
                required
                placeholder="Give your task a bold title..."
                value={task.title}
                onChange={handleChange}
                className="post-task-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description" className="post-task-label">Description</label>
              <textarea
                id="description"
                name="description"
                maxLength={1000}
                required
                placeholder="Describe what you need help with..."
                value={task.description}
                onChange={handleChange}
                className="post-task-textarea"
              />
            </div>
            <div className="form-group">
              <label htmlFor="media" className="post-task-label">Media (optional)</label>
              <input
                id="media"
                name="media"
                type="file"
                accept="image/,video/"
                multiple
                onChange={handleMediaChange}
                className="post-task-file"
              />
              <div className="post-task-media-preview">
                {task.media.map((url, idx) => (
                  <video
                    key={idx}
                    src={url}
                    controls
                  />
                ))}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="minits" className="post-task-label">Minits Offered</label>
              <input
                id="minits"
                name="minits"
                type="number"
                min={1}
                required
                value={task.minits}
                onChange={handleChange}
                className="post-task-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="field" className="post-task-label">Field</label>
              <input
                id="field"
                name="field"
                type="text"
                maxLength={50}
                required
                value={task.keywords.field}
                onChange={handleChange}
                className="post-task-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="urgency" className="post-task-label">Urgency</label>
              <select
                id="urgency"
                name="urgency"
                required
                value={task.keywords.urgency}
                onChange={handleChange}
                className="post-task-select"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <button type="submit" className="post-task-submit">
              Submit Task
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
