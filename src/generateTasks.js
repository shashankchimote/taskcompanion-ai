import genAI from "./gemini";

function offlinePlanner(userInput) {
  const tasks = userInput
    .split(/,|;|\n| and /i)
    .map((task) => task.trim())
    .filter(Boolean)
    .map((title) => ({
      title,
      priority:
        /exam|assignment|deadline|tomorrow|urgent/i.test(title)
          ? "high"
          : /course|project|week|study/i.test(title)
          ? "medium"
          : "low",
      due: /tomorrow/i.test(title)
        ? "Tomorrow"
        : /today/i.test(title)
        ? "Today"
        : /sunday/i.test(title)
        ? "Sunday"
        : /daily/i.test(title)
        ? "Daily"
        : "Flexible",
      time: /gym|workout/i.test(title)
        ? "1 hr"
        : /assignment|project|study|course/i.test(title)
        ? "2 hrs"
        : "30 min",
    }));

  return {
    message:
      "⚠️ Gemini is temporarily unavailable. Smart Offline Planner generated your tasks.",
    tasks,
  };
}

export async function generateTasks(userInput, personality) {
  const prompt = `
You are TaskCompanion AI.

Convert user's text into JSON only.

Format:
{
  "tasks": [
    {
      "title": "Task name",
      "priority": "high/medium/low",
      "due": "Today/Tomorrow/Sunday/Flexible/etc",
      "time": "estimated time"
    }
  ],
  "message": "short personalized message"
}

Personality: ${personality}
User input: ${userInput}
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
      return offlinePlanner(userInput);
    }

    return JSON.parse(text.substring(start, end + 1));
  } catch (error) {
    console.error("Gemini failed. Offline planner used:", error);
    return offlinePlanner(userInput);
  }
}