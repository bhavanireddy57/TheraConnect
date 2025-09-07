/*import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

const router = express.Router();

router.post('/analyze-quiz', async (req, res) => {
  const answers = req.body.answers; // [{ question, answer }]
  if (!answers || answers.length === 0) {
    return res.status(400).json({ summary: "No answers received", areas: [] });
  }

  try {
    const API_KEY = process.env.GEMINI_API_KEY;
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `
You are a mental health assistant.
Analyze the following quiz answers and provide:
1. A short summary of the user's mental state.
2. Three main areas of concern with suggestions.
Return ONLY JSON in this format:
{
  "summary": string,
  "areas": [
    { "name": string, "severity": string, "suggestions": [string] }
  ]
}
Quiz Answers:
${answers.map((a,i) => `${i+1}. Q: ${a.question} A: ${a.answer}`).join('\n')}
`;

    const resultData = await model.generateContent(prompt);

    // Extract text safely
    const text = resultData.output_text || resultData.output?.[0]?.content?.[0]?.text || '';

    // Try to parse JSON from AI
    let jsonResult = { summary: text, areas: [] };
    try {
      const match = text.match(/\{[\s\S]*\}/);
      if (match) jsonResult = JSON.parse(match[0]);
    } catch (err) {
      console.error("JSON parse error:", err);
    }

    res.json(jsonResult);

  } catch (err) {
    console.error("Error analyzing quiz:", err);
    res.status(500).json({ summary: "Error analyzing answers", areas: [] });
  }
});

export default router;*/



// routes/quizRoutes.js
/*import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();


const SCORE_MAP = {
  "Not at all": 0,
  "Several days": 1,
  "More than half the days": 2,
  "Nearly every day": 3,
};

// Group questions roughly by area (indices from your questionsData)
const AREA_GROUPS = {
  Depression: [0, 1, 6, 9],          // down, anhedonia, self-worth, sleep
  Anxiety: [2, 3, 8, 13],            // anxiety, relax, fear, worry control
  Stress: [4, 5, 7, 10, 11, 12],     // restlessness, fatigue, concentration, irritability, somatic, detachment
};

const AREA_TIPS = {
  Depression: [
    "Keep a gentle daily routine (wake time, meal time, short walk).",
    "Try activity scheduling: one small enjoyable activity today.",
    "Reach out to a trusted friend or family member.",
    "If symptoms persist, consider speaking with a licensed professional.",
  ],
  Anxiety: [
    "Practice 4-7-8 breathing for 3–5 minutes.",
    "Try a 10-minute mindfulness body-scan.",
    "Limit caffeine and news doom-scrolling in the evening.",
    "Grounding: Name 5 things you can see, 4 you can feel, 3 you can hear.",
  ],
  Stress: [
    "Use the 2-minute rule to start tasks and break them into chunks.",
    "Add a brief movement break (walk/stretch) every 60–90 minutes.",
    "Do a quick brain-dump journaling session before bed.",
    "Protect sleep: consistent bedtime + screens off 30 minutes before.",
  ],
};

// Curated motivational/skill videos by area (safe, general well-being content)
const AREA_VIDEOS = {
  Depression: [
    "https://www.youtube.com/watch?v=1vx8iUvfyCY", // 10 min guided meditation
    "https://www.youtube.com/watch?v=8ZqVxK4H7oY", // gentle motivation
  ],
  Anxiety: [
    "https://www.youtube.com/watch?v=aNXKjGFUlMs", // Anxiety relief breathing
    "https://www.youtube.com/watch?v=inpok4MKVLM", // 5 min meditation
  ],
  Stress: [
    "https://www.youtube.com/watch?v=ZToicYcHIOU", // Mindfulness breathing
    "https://www.youtube.com/watch?v=oOSno6wKQWA", // quick stretching
  ],
};

function severityFromScore(score) {
  if (score >= 8) return "Severe";
  if (score >= 5) return "Moderate";
  if (score >= 2) return "Mild";
  return "Low";
}

function ruleBasedAnalysis(answers) {
  // answers: [{ question, answer }]
  // Build per-area totals
  const perArea = Object.keys(AREA_GROUPS).map((area) => {
    const idxs = AREA_GROUPS[area];
    const score = idxs.reduce((sum, i) => {
      const ans = answers[i]?.answer || "Not at all";
      return sum + (SCORE_MAP[ans] ?? 0);
    }, 0);
    return { area, score, severity: severityFromScore(score) };
  });

  // Summary
  const top = [...perArea].sort((a, b) => b.score - a.score)[0];
  const summary =
    top && top.score > 0
      ? `Your responses suggest ${top.severity.toLowerCase()} ${top.area.toLowerCase()} patterns.`
      : "Your responses suggest low overall symptom levels. Keep checking in with yourself.";

  // Areas -> suggestions + videos
  const areas = perArea
    .filter((a) => a.score > 0) // show only areas with some score
    .map((a) => ({
      name: a.area,
      severity: a.severity,
      suggestions: AREA_TIPS[a.area],
      videos: AREA_VIDEOS[a.area],
    }));

  return { summary, areas };
}

// Try to parse strict JSON returned by model
function tryParseJson(text) {
  try {
    return JSON.parse(text);
  } catch {
    // sometimes models wrap JSON in code fences
    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
      try {
        return JSON.parse(match[0]);
      } catch {
        return null;
      }
    }
    return null;
  }
}

router.post("/analyze-quiz", async (req, res) => {
  const answers = req.body.answers; // [{ question, answer }]
  if (!answers || !Array.isArray(answers) || answers.length === 0) {
    return res.status(400).json({ summary: "No answers received", areas: [] });
  }

  // Build safe, compact representation for the LLM
  const answersText = answers
    .map((a, i) => `${i + 1}. Q: ${a.question} A: ${a.answer}`)
    .join("\n");

  // Prepare a rule-based fallback so we always return something useful
  const fallback = ruleBasedAnalysis(answers);

  // If no API key present or we want to be robust, just return fallback
  const API_KEY = process.env.GEMINI_API_KEY;
  if (!API_KEY) {
    return res.json(fallback);
  }

  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `
You are a careful, supportive mental-health assistant.
Return ONLY a single valid JSON object (no backticks, no commentary) with this shape:

{
  "summary": string,
  "areas": [
    {
      "name": "Depression" | "Anxiety" | "Stress",
      "severity": "Low" | "Mild" | "Moderate" | "Severe",
      "suggestions": [string, ...],
      "videos": [string, ...] // YouTube links (2–4 short, safe videos)
    }
  ]
}

Guidelines:
- Keep "summary" short, non-alarming, supportive, and actionable.
- Choose only areas that apply.
- Suggestions must be concrete self-help tips (breathing, journaling, sleep hygiene, CBT-style reframes).
- Videos must be general motivation / guided breathing / mindfulness / gentle movement.

Quiz Answers:
${answersText}
`.trim();

    const result = await model.generateContent(prompt);
    const text = result?.response?.text?.() ?? result?.response?.text?.() ?? "";

    // Try to parse model JSON; if it fails, use fallback
    const parsed = tryParseJson(text);
    if (!parsed || !parsed.summary || !Array.isArray(parsed.areas)) {
      return res.json(fallback);
    }

    // Basic sanitization/normalization
    const cleaned = {
      summary: String(parsed.summary).slice(0, 500),
      areas: parsed.areas.slice(0, 5).map((a) => ({
        name: ["Depression", "Anxiety", "Stress"].includes(a.name) ? a.name : "Stress",
        severity: ["Low", "Mild", "Moderate", "Severe"].includes(a.severity) ? a.severity : "Mild",
        suggestions: Array.isArray(a.suggestions) ? a.suggestions.slice(0, 8) : [],
        videos: Array.isArray(a.videos)
          ? a.videos.filter((v) => typeof v === "string" && v.includes("youtube.com")).slice(0, 4)
          : AREA_VIDEOS[a.name || "Stress"],
      })),
    };

    // If model omitted videos, inject curated list
    cleaned.areas = cleaned.areas.map((a) => ({
      ...a,
      videos: a.videos?.length ? a.videos : AREA_VIDEOS[a.name] || [],
      suggestions: a.suggestions?.length ? a.suggestions : AREA_TIPS[a.name] || [],
    }));

    return res.json(cleaned);
  } catch (err) {
    console.error("Error analyzing quiz:", err);
    // Always return something useful
    return res.json(fallback);
  }
});

export default router;*/



/*import express from "express";
import { generateMentalHealthAnalysis } from "../utils/geminiHelper.js";

const router = express.Router();

const SCORE_MAP = {
  "Not at all": 0,
  "Several days": 1,
  "More than half the days": 2,
  "Nearly every day": 3,
};

const AREA_GROUPS = {
  Depression: [0, 1, 6, 9],
  Anxiety: [2, 3, 8, 13],
  Stress: [4, 5, 7, 10, 11, 12],
};

const AREA_TIPS = {
  Depression: [
    "Keep a gentle daily routine (wake time, meal time, short walk).",
    "Try activity scheduling: one small enjoyable activity today.",
    "Reach out to a trusted friend or family member.",
    "If symptoms persist, consider speaking with a licensed professional.",
  ],
  Anxiety: [
    "Practice 4-7-8 breathing for 3–5 minutes.",
    "Try a 10-minute mindfulness body-scan.",
    "Limit caffeine and news doom-scrolling in the evening.",
    "Grounding: Name 5 things you can see, 4 you can feel, 3 you can hear.",
  ],
  Stress: [
    "Use the 2-minute rule to start tasks and break them into chunks.",
    "Add a brief movement break (walk/stretch) every 60–90 minutes.",
    "Do a quick brain-dump journaling session before bed.",
    "Protect sleep: consistent bedtime + screens off 30 minutes before.",
  ],
};

const AREA_VIDEOS = {
  Depression: [
    "https://www.youtube.com/watch?v=1vx8iUvfyCY",
    "https://www.youtube.com/watch?v=8ZqVxK4H7oY",
  ],
  Anxiety: [
    "https://www.youtube.com/watch?v=aNXKjGFUlMs",
    "https://www.youtube.com/watch?v=inpok4MKVLM",
  ],
  Stress: [
    "https://www.youtube.com/watch?v=ZToicYcHIOU",
    "https://www.youtube.com/watch?v=oOSno6wKQWA",
  ],
};

// Fallback if Gemini fails
function ruleBasedAnalysis(answers) {
  const perArea = Object.keys(AREA_GROUPS).map((area) => {
    const idxs = AREA_GROUPS[area];
    const score = idxs.reduce((sum, i) => {
      const ans = answers[i]?.answer || "Not at all";
      return sum + (SCORE_MAP[ans] ?? 0);
    }, 0);
    return {
      area,
      score,
      severity: score >= 8 ? "Severe" : score >= 5 ? "Moderate" : score >= 2 ? "Mild" : "Low",
    };
  });

  const top = [...perArea].sort((a, b) => b.score - a.score)[0];
  const summary =
    top && top.score > 0
      ? `Your responses suggest ${top.severity.toLowerCase()} ${top.area.toLowerCase()} patterns.`
      : "Your responses suggest low overall symptom levels. Keep checking in with yourself.";

  const areas = perArea
    .filter((a) => a.score > 0)
    .map((a) => ({
      name: a.area,
      severity: a.severity,
      suggestions: AREA_TIPS[a.area],
      videos: AREA_VIDEOS[a.area],
    }));

  return { summary, areas };
}

// POST /api/quiz/analyze-quiz
router.post("/analyze-quiz", async (req, res) => {
  const answers = req.body.answers;
  if (!answers || !Array.isArray(answers) || answers.length === 0) {
    return res.status(400).json({ summary: "No answers received", areas: [] });
  }

  const answersText = answers.map((a, i) => `${i + 1}. Q: ${a.question} A: ${a.answer}`).join("\n");
  const fallback = ruleBasedAnalysis(answers);

  const prompt = `
You are a careful, supportive mental-health assistant.
Return ONLY a JSON object (no commentary) with this shape:

{
  "summary": string,
  "areas": [
    {
      "name": "Depression" | "Anxiety" | "Stress",
      "severity": "Low" | "Mild" | "Moderate" | "Severe",
      "suggestions": [string, ...],
      "videos": [string, ...]
    }
  ]
}

Quiz Answers:
${answersText}
  `.trim();

  try {
    const aiResponse = await generateMentalHealthAnalysis(prompt);

    if (!aiResponse || !aiResponse.summary || !Array.isArray(aiResponse.areas)) {
      return res.json(fallback);
    }

    return res.json(aiResponse);
  } catch (err) {
    console.error("Quiz AI error:", err);
    return res.json(fallback);
  }
});

export default router;*/


/*import express from "express";
import { generateMentalHealthAnalysis } from "../utils/geminiHelper.js";

const router = express.Router();

// Score mapping
const SCORE_MAP = {
  "Not at all": 0,
  "Several days": 1,
  "More than half the days": 2,
  "Nearly every day": 3,
};

// Area grouping
const AREA_GROUPS = {
  Depression: [0, 1, 6, 9],
  Anxiety: [2, 3, 8, 13],
  Stress: [4, 5, 7, 10, 11, 12],
};

// Basic fallback suggestions
const AREA_TIPS = {
  Depression: ["Keep a gentle daily routine.", "Try a small enjoyable activity today."],
  Anxiety: ["Practice 4-7-8 breathing.", "Try a 10-min mindfulness body-scan."],
  Stress: ["Take short movement breaks.", "Do a quick journaling session."],
};

// YouTube videos
const AREA_VIDEOS = {
  Depression: ["https://www.youtube.com/watch?v=1vx8iUvfyCY"],
  Anxiety: ["https://www.youtube.com/watch?v=aNXKjGFUlMs"],
  Stress: ["https://www.youtube.com/watch?v=ZToicYcHIOU"],
};

// Compute severity from numeric score
function severityFromScore(score) {
  if (score >= 8) return "Severe";
  if (score >= 5) return "Moderate";
  if (score >= 2) return "Mild";
  return "Low";
}

// Rule-based scoring
function ruleBasedAnalysis(answers) {
  const perArea = Object.keys(AREA_GROUPS).map((area) => {
    const score = AREA_GROUPS[area].reduce((sum, i) => {
      const ans = answers[i]?.answer || "Not at all";
      return sum + (SCORE_MAP[ans] ?? 0);
    }, 0);
    return {
      name: area,
      score,
      severity: severityFromScore(score),
      suggestions: AREA_TIPS[area],
      videos: AREA_VIDEOS[area],
    };
  });

  const topArea = perArea.sort((a, b) => b.score - a.score)[0];

  const summary =
    topArea && topArea.score > 0
      ? `Your responses suggest ${topArea.severity.toLowerCase()} ${topArea.name.toLowerCase()} patterns.`
      : "Your responses suggest low overall symptom levels. Keep checking in with yourself.";

  return { summary, areas: perArea.filter(a => a.score > 0) };
}

// POST /api/quiz/analyze-quiz
router.post("/analyze-quiz", async (req, res) => {
  const answers = req.body.answers;
  if (!answers || !Array.isArray(answers) || answers.length === 0) {
    return res.status(400).json({ summary: "No answers received", areas: [] });
  }

  const fallback = ruleBasedAnalysis(answers);

  try {
    // Build prompt for Gemini — ask for friendly advice only
    const prompt = `
You are a supportive mental health assistant.
Given these quiz results (already scored and categorized), provide friendly, detailed advice for each area.
Return ONLY JSON with "areas": [{ "name", "friendlyAdvice": string }] for each area.

Quiz Areas:
${JSON.stringify(fallback.areas, null, 2)}
    `;

    const aiResponse = await generateMentalHealthAnalysis(prompt);

    // Merge Gemini advice into fallback
    if (aiResponse && Array.isArray(aiResponse.areas)) {
      fallback.areas = fallback.areas.map(area => {
        const aiArea = aiResponse.areas.find(a => a.name === area.name);
        return {
          ...area,
          friendlyAdvice: aiArea?.friendlyAdvice || `Keep practicing the tips above for ${area.name}.`
        };
      });
    }

    return res.json(fallback);
  } catch (err) {
    console.error("Quiz AI error:", err);
    return res.json(fallback);
  }
});

export default router;*/


import express from "express";
import { analyzeQuiz } from "../controller/quiz-controller.js";
import { authenticateJWT } from "../controller/authMiddleware.js";

const router = express.Router();

// Secure quiz route
router.post("/analyze-quiz", authenticateJWT, analyzeQuiz);

export default router;

