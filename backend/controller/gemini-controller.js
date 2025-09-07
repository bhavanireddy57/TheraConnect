/*import dotenv from "dotenv";
dotenv.config();
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const chatWithGemini = async (req, res) => {
  try {
    const { userMessage } = req.body;

    if (!userMessage) {
      return res.status(400).json({ error: "No user message provided" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" }); // or "models/gemini-1.5-pro"

    const result = await model.generateContent(userMessage);
    const response = await result.response;
    const text = response.text();

    res.json({ reply: text });
  } catch (err) {
    console.error("Gemini API Error:", err);
    res.status(500).json({ error: err.message || "Something went wrong" });
  }
};*/


/*import dotenv from "dotenv";
dotenv.config();
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY
});

export const chatWithGemini = async (req, res) => {
  try {
    const { message, userMessage } = req.body;
    const finalMessage = message || userMessage;

    if (!finalMessage) {
      return res.status(400).json({ error: "No message provided" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const result = await model.generateContent(finalMessage);

    // Log raw result for debugging
    console.log("🔍 Gemini raw result:", JSON.stringify(result, null, 2));

    // Try different extraction methods
    let text = result.response?.text();

    if (!text && result.response?.candidates?.length > 0) {
      text = result.response.candidates[0]?.content?.parts?.[0]?.text || "";
    }

    if (!text) {
      return res.status(500).json({ error: "No response from AI" });
    }

    res.json({ reply: text });
  } catch (err) {
    console.error("Gemini API Error:", err);
    res.status(500).json({ error: err.message || "Something went wrong" });
  }
};*/


/*import dotenv from "dotenv";
dotenv.config();
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const chatWithGemini = async (req, res) => {
  try {
    console.log("📩 Incoming request body:", req.body);

    const { message, userMessage } = req.body;
    const finalMessage = message || userMessage;

    if (!finalMessage) {
      return res.status(400).json({ error: "No message provided" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    // ✅ Generate content
    const result = await model.generateContent(finalMessage);

    // ✅ Must unwrap response properly
    const response = await result.response;
    const text = response.text();

    if (!text) {
      console.error("⚠️ No text in Gemini response:", JSON.stringify(result, null, 2));
      return res.status(500).json({ error: "No response from AI" });
    }

    console.log("🤖 Gemini reply:", text);

    // ✅ Send clean AI reply back
    res.json({ reply: text });
  } catch (err) {
    console.error("❌ Gemini API Error:", err);
    res.status(500).json({ error: err.message || "Something went wrong" });
  }
};*/


/*import dotenv from "dotenv";
dotenv.config();
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const chatWithGemini = async (req, res) => {
  try {
    // ✅ JWT-authenticated user
    const userId = req.user?.id;
    if (!userId) return res.status(403).json({ error: "Unauthorized" });

    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "No message provided" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const result = await model.generateContent(message);
    const text = result.response.text();

    if (!text) {
      console.error("⚠️ No text in Gemini response:", JSON.stringify(result, null, 2));
      return res.status(500).json({ error: "No response from AI" });
    }

    console.log(`🤖 Gemini reply for user ${userId}:`, text);
    res.json({ reply: text });
  } catch (err) {
    console.error("❌ Gemini API Error:", err);
    res.status(500).json({ error: err.message || "Something went wrong" });
  }
};*/


import dotenv from "dotenv";
dotenv.config();
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const chatWithGemini = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(403).json({ error: "Unauthorized" });

    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "No message provided" });

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const result = await model.generateContent(message);
    const text = result.response.text();

    if (!text) {
      console.error("⚠️ No text in Gemini response:", JSON.stringify(result, null, 2));
      return res.status(500).json({ error: "No response from AI" });
    }

    console.log(`🤖 Gemini reply for user ${userId}:`, text);
    res.json({ reply: text });
  } catch (err) {
    console.error("❌ Gemini API Error:", err);
    res.status(500).json({ error: err.message || "Something went wrong" });
  }
};
