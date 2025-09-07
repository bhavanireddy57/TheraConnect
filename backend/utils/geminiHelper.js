// backend/utils/geminiHelper.js
/*import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generateMentalHealthAnalysis(prompt) {

    
  const API_KEY = process.env.GEMINI_API_KEY;
  if (!API_KEY) throw new Error("Gemini API key missing");

  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

  const result = await model.generateContent(prompt);
  const text = result?.response?.text?.() || "";

  try {
    return JSON.parse(text);
  } catch {
    // fallback if Gemini output is not valid JSON
    return null;
  }
}*/




/*import { GoogleGenerativeAI } from "@google/generative-ai";


export async function generateMentalHealthAnalysis(prompt) {
  const API_KEY = process.env.GEMINI_API_KEY;
  if (!API_KEY) throw new Error("Gemini API key missing");

  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

  const result = await model.generateContent(prompt);
  const text = result?.response?.text?.() || "";

  console.log("Gemini raw output:", text); // ✅ Debug output

  // Try strict parse first
  try {
    return JSON.parse(text);
  } catch {
    // Try to extract JSON inside text (even if AI added extra commentary)
    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
      try {
        return JSON.parse(match[0]);
      } catch {
        return null;
      }
    }
    // As last resort, return the whole text as summary
    return { summary: text, areas: [] };
  }
}*/



import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * Call Gemini AI with prompt and safely parse JSON output.
 */
export async function generateMentalHealthAnalysis(prompt) {
  const API_KEY = process.env.GEMINI_API_KEY;
  if (!API_KEY) throw new Error("Gemini API key missing");

  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

  const result = await model.generateContent(prompt);
  const text = result?.response?.text?.() || "";

  // 🔹 Debug: log raw Gemini output
  console.log("----- Gemini Raw Output Start -----");
  console.log(text);
  console.log("----- Gemini Raw Output End -----");

  // Try strict parse first
  try {
    return JSON.parse(text);
  } catch {
    // Try to extract JSON inside text (even if AI added extra commentary)
    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
      try {
        return JSON.parse(match[0]);
      } catch {
        return { summary: text, areas: [] };
      }
    }
    // As last resort, return the whole text as summary
    return { summary: text, areas: [] };
  }
}

