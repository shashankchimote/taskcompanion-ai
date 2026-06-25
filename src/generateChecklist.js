import genAI from "./gemini";

function offlineChecklist(userInput) {
  return {
    title: userInput || "Long Term Goal",
    duration: "6-8 weeks",
    items: [
      { topic: "Understand basics", source: "freeCodeCamp / YouTube", time: "3 days" },
      { topic: "Build foundation", source: "Official docs", time: "1 week" },
      { topic: "Practice core topics", source: "Kaggle / MDN / Docs", time: "1 week" },
      { topic: "Make mini project", source: "YouTube project tutorial", time: "1 week" },
      { topic: "Revise weak areas", source: "Notes + practice", time: "4 days" },
      { topic: "Build final project", source: "GitHub examples", time: "2 weeks" },
      { topic: "Deploy and document", source: "Vercel / Firebase docs", time: "3 days" },
      { topic: "Add to portfolio", source: "GitHub README", time: "1 day" },
    ],
  };
}

export async function generateChecklist(userInput) {
  const prompt = `
Create a topic-wise checklist for this goal.

Return ONLY JSON:

{
  "title": "Goal title",
  "duration": "estimated duration",
  "items": [
    {
      "topic": "Topic name",
      "source": "Best free source/resource",
      "time": "estimated time"
    }
  ]
}

Goal:
${userInput}
`;

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    });

    const result = await model.generateContent(prompt);
    let text = result.response.text();

    text = text.replace(/```json/g, "").replace(/```/g, "").trim();

    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");

    if (start === -1 || end === -1) {
      return offlineChecklist(userInput);
    }

    return JSON.parse(text.substring(start, end + 1));
  } catch (error) {
    console.error("Gemini checklist failed. Offline checklist used:", error);
    return offlineChecklist(userInput);
  }
}