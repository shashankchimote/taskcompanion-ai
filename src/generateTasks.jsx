import ai from "./gemini";

export async function generateTasks(userInput, personality) {
  const prompt = `
You are TaskCompanion AI, a productivity companion.

User personality mode: ${personality}

Convert the user's text into valid JSON.

Return ONLY this JSON format:

{
  "tasks": [
    {
      "title": "Task name",
      "priority": "high/medium/low",
      "due": "Today/Tomorrow/Sunday/Flexible/etc",
      "time": "estimated time"
    }
  ],
  "message": "A short personalized companion message based on the tasks and personality mode"
}

Rules:
- Message should feel personal, funny or motivating.
- If Roast mode, be savage but not insulting.
- If Coach mode, be disciplined.
- If Friendly mode, be supportive.
- If Meme mode, be funny.
- If Monk mode, be calm.
- Return ONLY JSON.

User input:
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

  const jsonString = text.substring(start, end + 1);

  return JSON.parse(jsonString);
}