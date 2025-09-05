/*import React, { useState, useEffect, useRef } from "react";
import Loader from "react-js-loader";
import Navbar from "../navbar/Navbar";
import "./Therapist.css";

const TypingAnimation = ({ color }) => (
  <div className="item text-2xl">
    <Loader type="ping-cube" bgColor={color} color={color} size={100} />
  </div>
);

const Therapist = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatBoxRef = useRef(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to chat with AI.");
      return;
    }

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5001/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();

      if (response.status === 401 || response.status === 403) {
        setMessages((prev) => [
          ...prev,
          { sender: "ai", text: "Authorization failed. Please login again." },
        ]);
        setLoading(false);
        return;
      }

      const aiText = data.reply || "The AI didn’t return a response. Please try again.";
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setMessages((prev) => [...prev, { sender: "ai", text: aiText }]);
    } catch (err) {
      console.error("Error generating response:", err);
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Error generating response. Please try again later." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => setInput(e.target.value);
  const handleKeyPress = (e) => { if (e.key === "Enter") handleSend(); };

  useEffect(() => {
    if (chatBoxRef.current) chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  }, [messages]);

  return (
    <>
      <Navbar />
      <div className="therapist-container">
        <h1 className="heading">Your Personal AI Therapist</h1>
        <div ref={chatBoxRef} className="chat-box">
          {messages.map((msg, i) => (
            <div key={i} className={`message ${msg.sender === "user" ? "user-message" : "ai-message"}`}>
              {msg.text}
            </div>
          ))}
          {loading && <TypingAnimation color="#007BFF" />}
        </div>

        <div className="input-container">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="input-field"
          />
          <button onClick={handleSend} className="send-button">Send</button>
        </div>
      </div>
    </>
  );
};

export default Therapist;*/



/*import React, { useState, useEffect, useRef } from "react";
import Loader from "react-js-loader";
import Navbar from "../navbar/Navbar";

const TypingAnimation = ({ color }) => (
  <div className="flex justify-start px-4 py-2">
    <Loader type="spinner-cub" bgColor={color} color={color} size={40} />
  </div>
);

const Therapist = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatBoxRef = useRef(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to chat with AI.");
      return;
    }

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5001/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();

      if (response.status === 401 || response.status === 403) {
        setMessages((prev) => [
          ...prev,
          { sender: "ai", text: "⚠️ Authorization failed. Please login again." },
        ]);
        setLoading(false);
        return;
      }

      const aiText =
        data.reply || "🤔 The AI didn’t return a response. Please try again.";
      await new Promise((resolve) => setTimeout(resolve, 600));
      setMessages((prev) => [...prev, { sender: "ai", text: aiText }]);
    } catch (err) {
      console.error("Error generating response:", err);
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "❌ Error generating response. Please try again later.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => setInput(e.target.value);
  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  useEffect(() => {
    if (chatBoxRef.current)
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  }, [messages, loading]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="flex-grow flex flex-col items-center pt-24 pb-6">
          <div className="w-full max-w-3xl flex flex-col bg-white shadow-md border border-gray-200">
           
            <div className="bg-blue-100 text-gray-800 px-6 py-3 border-b border-gray-200">
              <h1 className="text-lg font-semibold">💬 AI Therapist</h1>
              <p className="text-sm opacity-80">Here to listen and support you</p>
            </div>

          
            <div
              ref={chatBoxRef}
              className="flex-1 overflow-y-auto p-6 space-y-3 bg-gray-50"
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`px-4 py-2 text-sm shadow-sm max-w-xs sm:max-w-md 
                      ${
                        msg.sender === "user"
                          ? "bg-blue-200 text-gray-900"
                          : "bg-white text-gray-800 border border-gray-300"
                      }`}
                    style={{ borderRadius: "4px" }} // almost square
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {loading && <TypingAnimation color="#3b82f6" />}
            </div>

         
            <div className="border-t bg-white p-3 flex items-center gap-3">
              <input
                type="text"
                value={input}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded-sm px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-300"
              />
              <button
                onClick={handleSend}
                className="bg-blue-400 text-white px-5 py-2 rounded-sm hover:bg-blue-500 transition"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Therapist;*/



import React, { useState, useEffect, useRef } from "react";
//import Loader from "react-js-loader";
import Navbar from "../navbar/Navbar";

const TypingAnimation = ({ color }) => (
  <div className="flex items-center space-x-1 px-4 py-2">
    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }}></span>
    <span className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: color }}></span>
    <span className="w-2 h-2 rounded-full animate-bounce delay-150" style={{ backgroundColor: color }}></span>
  </div>
);

const Therapist = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatBoxRef = useRef(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to chat with AI.");
      return;
    }

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/gemini`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();

      if (response.status === 401 || response.status === 403) {
        setMessages((prev) => [
          ...prev,
          { sender: "ai", text: "⚠️ Authorization failed. Please login again." },
        ]);
        setLoading(false);
        return;
      }

      const aiText =
        data.reply || "🤔 The AI didn’t return a response. Please try again.";
      await new Promise((resolve) => setTimeout(resolve, 600));
      setMessages((prev) => [...prev, { sender: "ai", text: aiText }]);
    } catch (err) {
      console.error("Error generating response:", err);
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "❌ Error generating response. Please try again later.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => setInput(e.target.value);
  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  useEffect(() => {
    if (chatBoxRef.current)
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  }, [messages, loading]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100">
        <div className="w-full max-w-2xl flex flex-col rounded-3xl shadow-xl bg-white/70 backdrop-blur-md border border-white/40 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-400 to-purple-400 text-white px-6 py-4">
            <h1 className="text-lg font-semibold">💬 AI Therapist</h1>
            <p className="text-sm opacity-90">Here to listen and support you</p>
          </div>

          {/* Chat Messages */}
          <div
            ref={chatBoxRef}
            className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-br from-white/60 to-purple-50"
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-3 text-sm shadow-md max-w-[75%] break-words
                    ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-2xl rounded-br-sm"
                        : "bg-white text-gray-800 border border-gray-200 rounded-2xl rounded-bl-sm"
                    }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && <TypingAnimation color="#3b82f6" />}
          </div>

          {/* Input */}
          <div className="p-4 bg-white flex items-center space-x-3 border-t">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 border border-gray-300 rounded-full px-5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleSend}
              className="bg-gradient-to-r from-blue-400 to-purple-400 text-white px-6 py-2 rounded-full shadow hover:opacity-90 transition"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Therapist;

