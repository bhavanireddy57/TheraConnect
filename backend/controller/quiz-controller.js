import { generateMentalHealthAnalysis } from "../utils/geminiHelper.js";

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

// Suggestions fallback
const AREA_TIPS = {
  Depression: ["Keep a gentle daily routine.", "Try a small enjoyable activity today."],
  Anxiety: ["Practice 4-7-8 breathing.", "Try a 10-min mindfulness body-scan."],
  Stress: ["Take short movement breaks.", "Do a quick journaling session."],
};

// YouTube fallback
const AREA_VIDEOS = {
  Depression: ["https://www.youtube.com/watch?v=1vx8iUvfyCY"],
  Anxiety: ["https://www.youtube.com/watch?v=aNXKjGFUlMs"],
  Stress: ["https://www.youtube.com/watch?v=ZToicYcHIOU"],
};

// Severity helper
function severityFromScore(score) {
  if (score >= 8) return "Severe";
  if (score >= 5) return "Moderate";
  if (score >= 2) return "Mild";
  return "Low";
}

// Rule-based fallback
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

  return { summary, areas: perArea.filter((a) => a.score > 0) };
}

// ✅ Controller
export const analyzeQuiz = async (req, res) => {
  const answers = req.body.answers;
  if (!answers || !Array.isArray(answers) || answers.length === 0) {
    return res.status(400).json({ summary: "No answers received", areas: [] });
  }

  // Always compute fallback
  const fallback = ruleBasedAnalysis(answers);

  try {
    // Ask Gemini for friendly advice
    const prompt = `
You are a supportive mental health assistant.
Given these quiz results (already scored and categorized), provide short, empathetic advice for each area.
Return ONLY valid JSON:

{
  "areas": [
    { "name": "Depression | Anxiety | Stress",
      "friendlyAdvice": "short supportive text"
    }
  ]
}

Quiz Areas:
${JSON.stringify(fallback.areas, null, 2)}
    `;

    const aiResponse = await generateMentalHealthAnalysis(prompt);

    // Merge Gemini’s friendlyAdvice
    if (aiResponse && Array.isArray(aiResponse.areas)) {
      fallback.areas = fallback.areas.map((area) => {
        const aiArea = aiResponse.areas.find((a) => a.name === area.name);
        return {
          ...area,
          friendlyAdvice: aiArea?.friendlyAdvice || `Keep practicing the tips above for ${area.name}.`,
        };
      });
    }

    return res.json(fallback);
  } catch (err) {
    console.error("Quiz AI error:", err);
    return res.json(fallback);
  }
};
