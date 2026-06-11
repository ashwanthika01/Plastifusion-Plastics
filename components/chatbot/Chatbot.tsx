"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2, Bot } from "lucide-react";

export default function PlastifusionChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello! Welcome to Plastifusion Plastics. I can help you with materials, machine capacities, quotes, and factory tours. What would you like to know?",
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
      // Calls YOUR Next.js proxy route — not Anthropic directly.
      // No API key in this file at all.
      // Filter out the initial greeting message (index 0) — only send actual conversation
      const conversationMessages = updatedMessages.slice(1);
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: conversationMessages }),
      });

      if (!response.ok) throw new Error(`Server error ${response.status}`);

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I'm having trouble connecting right now. Please use the Get Quote form or contact our team directly.",
        },
      ]);
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
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open chat"}
        style={{
          position: "fixed", bottom: "1.5rem", right: "1.5rem", zIndex: 9999,
          width: "56px", height: "56px", borderRadius: "50%",
          background: "#006B2D", border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#fff", boxShadow: "0 4px 24px rgba(0,107,45,0.35)",
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.07)"; e.currentTarget.style.boxShadow = "0 6px 32px rgba(0,107,45,0.45)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,107,45,0.35)"; }}
      >
        {open ? <X size={20} /> : <MessageCircle size={20} />}
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Plastifusion chat assistant"
          style={{
            position: "fixed", bottom: "5.5rem", right: "1.5rem", zIndex: 9998,
            width: "360px", height: "520px", borderRadius: "20px",
            background: "#fff", border: "1px solid #e5e7eb",
            boxShadow: "0 8px 48px rgba(0,0,0,0.14)",
            display: "flex", flexDirection: "column", overflow: "hidden",
            animation: "chatSlideIn 0.22s ease",
          }}
        >
          <style>{`
            @keyframes chatSlideIn { from { opacity:0; transform:translateY(12px) scale(0.97); } to { opacity:1; transform:translateY(0) scale(1); } }
            @keyframes msgFadeIn  { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }
            @keyframes bounce     { 0%,80%,100% { transform:translateY(0); opacity:0.4; } 40% { transform:translateY(-5px); opacity:1; } }
            @keyframes spin       { to { transform:rotate(360deg); } }
            .pf-msg-in  { animation: msgFadeIn 0.18s ease; }
            .pf-send-btn:hover:not(:disabled) { background: #005424 !important; }
            .pf-send-btn:active:not(:disabled) { transform: scale(0.95); }
            .pf-input:focus { border-color: #006B2D !important; outline: none; box-shadow: 0 0 0 3px rgba(0,107,45,0.1); }
          `}</style>

          {/* Header */}
          <div style={{ background: "#006B2D", padding: "14px 16px", display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "34px", height: "34px", borderRadius: "50%", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Bot size={18} color="#fff" />
            </div>
            <div>
              <p style={{ margin: 0, color: "#fff", fontWeight: 600, fontSize: "14px", lineHeight: 1.2 }}>Plastifusion Assistant</p>
              <p style={{ margin: 0, color: "rgba(255,255,255,0.75)", fontSize: "12px" }}>{loading ? "Typing…" : "Online — ask anything"}</p>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: "10px", background: "#f9fafb" }}>
            {messages.map((msg, i) => (
              <div key={i} className="pf-msg-in" style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
                <div style={{
                  maxWidth: "82%", padding: "10px 13px",
                  borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                  background: msg.role === "user" ? "#006B2D" : "#fff",
                  color: msg.role === "user" ? "#fff" : "#1a1a1a",
                  fontSize: "13.5px", lineHeight: 1.55,
                  border: msg.role === "user" ? "none" : "1px solid #e5e7eb",
                  boxShadow: msg.role === "user" ? "none" : "0 1px 4px rgba(0,0,0,0.05)",
                }}>
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div style={{ padding: "10px 14px", borderRadius: "16px 16px 16px 4px", background: "#fff", border: "1px solid #e5e7eb", display: "flex", gap: "5px", alignItems: "center" }}>
                  {[0, 0.2, 0.4].map((delay, i) => (
                    <span key={i} style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#006B2D", display: "inline-block", animation: `bounce 1.1s ${delay}s infinite` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{ padding: "12px", borderTop: "1px solid #e5e7eb", background: "#fff", display: "flex", gap: "8px", alignItems: "center" }}>
            <input
              ref={inputRef}
              className="pf-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask about materials, pricing…"
              disabled={loading}
              style={{ flex: 1, padding: "9px 13px", borderRadius: "12px", border: "1.5px solid #d1d5db", fontSize: "13.5px", background: loading ? "#f3f4f6" : "#fff", color: "#1a1a1a", transition: "border-color 0.15s, box-shadow 0.15s" }}
            />
            <button
              className="pf-send-btn"
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              aria-label="Send message"
              style={{ width: "38px", height: "38px", borderRadius: "12px", background: loading || !input.trim() ? "#9ca3af" : "#006B2D", border: "none", cursor: loading || !input.trim() ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", flexShrink: 0, transition: "background 0.15s" }}
            >
              {loading ? <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} /> : <Send size={16} />}
            </button>
          </div>
        </div>
      )}
    </>
  );
}