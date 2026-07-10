"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2, Bot } from "lucide-react";

export default function PlastifusionChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! Welcome to Plastifusion Plastics. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [open]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMsg = { role: "user", content: trimmed };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      // Calls our own Next.js API route — the OpenRouter key stays on the server
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: updatedMessages.slice(1).map(m => ({ role: m.role, content: m.content })),
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        console.log("Status:", response.status);
        console.log("Error:", error);
        throw new Error(`Error ${response.status}: ${error}`);
      }

      const data = await response.json();
      const reply = data.reply || "Sorry, I couldn't respond.";

      setMessages(prev => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "I'm having trouble connecting. Please try again or use our Get Quote form."
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <style>{`
        .pf-chat-input::placeholder {
          color: #999;
          opacity: 1;
        }
        .pf-chat-toggle:hover {
          transform: scale(1.06);
        }
        .pf-chat-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .pf-chat-scroll::-webkit-scrollbar-thumb {
          background: #c9c9c9;
          border-radius: 10px;
        }
      `}</style>

      <button
        className="pf-chat-toggle"
        onClick={() => setOpen(v => !v)}
        style={{
          position: "fixed", bottom: "20px", right: "20px", zIndex: 9999,
          width: "60px", height: "60px", borderRadius: "50%", background: "#006B2D",
          border: "none", color: "white", cursor: "pointer", boxShadow: "0 4px 20px rgba(0,107,45,0.4)",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          padding: 0
        }}
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {open && (
        <div style={{
          position: "fixed", bottom: "90px", right: "20px", zIndex: 9998,
          width: "360px", height: "520px", background: "white", borderRadius: "16px",
          boxShadow: "0 10px 40px rgba(0,0,0,0.2)", display: "flex", flexDirection: "column",
          overflow: "hidden", border: "1px solid #ddd"
        }}>
          {/* Header */}
          <div style={{ background: "#006B2D", color: "white", padding: "12px", display: "flex", alignItems: "center", gap: "10px" }}>
            <Bot size={22} />
            <div>
              <div style={{ fontWeight: 600 }}>Plastifusion Assistant</div>
              <div style={{ fontSize: "12px", opacity: 0.8 }}>{loading ? "Thinking..." : "Online"}</div>
            </div>
          </div>

          {/* Messages */}
          <div className="pf-chat-scroll" style={{ flex: 1, overflowY: "auto", padding: "15px", background: "#f8f9fa" }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ marginBottom: "12px", display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
                <div style={{
                  maxWidth: "85%",
                  padding: "10px 14px",
                  borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                  background: msg.role === "user" ? "#006B2D" : "#fff",
                  color: msg.role === "user" ? "#fff" : "#333",
                  border: msg.role === "assistant" ? "1px solid #eee" : "none",
                  boxShadow: msg.role === "assistant" ? "0 1px 4px rgba(0,0,0,0.05)" : "none",
                  lineHeight: 1.4
                }}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: "12px" }}>
                <div style={{
                  padding: "10px 14px", borderRadius: "18px 18px 18px 4px",
                  background: "#fff", border: "1px solid #eee", color: "#999",
                  fontSize: "13px"
                }}>
                  Thinking...
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{ padding: "12px", borderTop: "1px solid #eee", background: "white", display: "flex", gap: "8px" }}>
            <input
              ref={inputRef}
              className="pf-chat-input"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Type your message..."
              disabled={loading}
              style={{
                flex: 1, padding: "10px 12px", borderRadius: "12px", border: "1px solid #ccc",
                color: "#1a1a1a", background: "#fff", fontSize: "14px", outline: "none"
              }}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              style={{
                padding: "10px 16px", background: "#006B2D", color: "white", border: "none",
                borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center",
                cursor: loading || !input.trim() ? "not-allowed" : "pointer",
                opacity: loading || !input.trim() ? 0.6 : 1
              }}
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
            </button>
          </div>
        </div>
      )}
    </>
  );
}