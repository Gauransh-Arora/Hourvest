import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Sparkles, BotIcon, UserIcon } from "lucide-react";
import "../src/AIChatpage.css";

export default function AIChatPage() {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hello, how can I assist you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await response.json();
      console.log("🌐 Backend response:", data);

      const aiMessage = {
        role: "assistant",
        text: data?.response || "Hmm... no reply came through.",
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("🚨 API call failed:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Oops! Something went wrong. Please try again later.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chat-wrapper">
      <motion.div
        className="background-stars"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        style={{ backgroundImage: 'url("/stars-pattern.svg")' }}
      ></motion.div>

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="chat-title"
      >
        <Sparkles className="sparkle-icon" /> Hourvest AI
      </motion.h1>

      <div className="chat-card">
        <div ref={chatRef} className="chat-content">
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: msg.role === "user" ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className={`chat-bubble ${msg.role}`}
            >
              {msg.role === "user" ? (
                <UserIcon size={18} />
              ) : (
                <BotIcon size={18} className="bot-icon" />
              )}
              <span>{msg.text}</span>
            </motion.div>
          ))}
          {loading && (
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="chat-bubble assistant"
            >
              <BotIcon size={18} className="bot-icon" />
              <span>Typing...</span>
            </motion.div>
          )}
        </div>

        <div className="chat-input-section">
          <input
            className="chat-input"
            placeholder="Ask Hourvest AI..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            disabled={loading}
          />
          <button
            className="chat-send-button"
            onClick={handleSend}
            disabled={loading}
          >
            {loading ? "..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}
