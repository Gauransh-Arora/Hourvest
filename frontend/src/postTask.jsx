import React, { useState } from "react";
import axios from "axios";

const PostTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [minits, setMinits] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to post a task.");
      window.location.href = "/login";
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/tasks",
        {
          title,
          description,
          minits,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Task posted successfully!");
      window.location.href = "/profile"; // or redirect somewhere else

    } catch (err) {
      console.error("Error posting task:", err);
      alert("Failed to post task. Try again.");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Post a New Task</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={styles.input}
        />

        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={5}
          style={styles.textarea}
        />

        <input
          type="number"
          placeholder="Minits you're offering"
          value={minits}
          onChange={(e) => setMinits(e.target.value)}
          required
          min={1}
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Post Task
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "500px",
    margin: "80px auto",
    padding: "30px",
    backgroundColor: "#1a1a1a",
    color: "white",
    borderRadius: "10px",
    boxShadow: "0 0 15px #00ffd5",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "10px",
    backgroundColor: "#2b2b2b",
    border: "none",
    borderRadius: "5px",
    color: "white",
  },
  textarea: {
    padding: "10px",
    backgroundColor: "#2b2b2b",
    border: "none",
    borderRadius: "5px",
    color: "white",
    resize: "vertical",
  },
  button: {
    padding: "10px",
    backgroundColor: "#00ffd5",
    color: "black",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default PostTask;
