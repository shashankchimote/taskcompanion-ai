import ai from "./gemini";

export async function generateChecklist(userInput) {
  const prompt = `
You are TaskCompanion AI.

Create a topic-wise long-term checklist for the user's goal.

Return ONLY valid JSON in this format:

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

Rules:
- Keep topics practical and ordered.
- Sources should be real common resources like freeCodeCamp, Kaggle, YouTube, official docs, 3Blue1Brown, Andrew Ng, FastAI, MDN, etc.
- Return JSON only.

User goal:
${userInput}
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: prompt,
  });

  let text = response.text;
  text = text.replace(/```json/g, "").replace(/```/g, "").trim();

  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");

  if (start === -1 || end === -1) {
    throw new Error("No JSON object found");
  }

  return JSON.parse(text.substring(start, end + 1));
}