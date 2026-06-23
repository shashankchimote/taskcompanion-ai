import { Moon, Sparkles, CheckCircle2, XCircle, Sunrise } from "lucide-react";

function getReflectionMessage(personality, completedCount, totalGoals, progress) {
  const missed = totalGoals - completedCount;

  if (progress === 100) {
    return "Perfect day. You completed everything. This is exactly how consistency is built.";
  }

  if (personality === "Roast") {
    return `You completed ${completedCount} and left ${missed}. Not terrible, but future you is definitely side-eyeing you.`;
  }

  if (personality === "Friendly") {
    return `You completed ${completedCount} tasks today. That matters. Tomorrow, we will gently improve the missed ones.`;
  }

  if (personality === "Meme") {
    return `Today’s productivity arc: ${completedCount} completed, ${missed} escaped. Bro, the side quests were strong.`;
  }

  if (personality === "Monk") {
    return `You completed ${completedCount} tasks. Notice the progress, release the guilt, return tomorrow with focus.`;
  }

  return `You completed ${completedCount} out of ${totalGoals} tasks. Good progress, but tomorrow starts with the unfinished work.`;
}

function getTomorrowSuggestion(progress) {
  if (progress >= 80) return "Keep the same rhythm tomorrow. Start with one high-priority task first.";
  if (progress >= 50) return "Tomorrow, reduce distractions and finish the hardest task before noon.";
  return "Tomorrow, keep only 3 core tasks. Win small, then build momentum.";
}

function ReflectionCard({ personality, completedCount, totalGoals, progress }) {
  const missed = totalGoals - completedCount;

  return (
    <section className="reflection-card">
      <div className="reflection-header">
        <div>
          <p className="eyebrow">Reflection Agent</p>
          <h3><Moon size={22} /> Night Summary</h3>
        </div>

        <div className="reflection-score">
          <span>{progress}</span>
          <small>/100</small>
        </div>
      </div>

      <div className="reflection-stats">
        <div>
          <CheckCircle2 size={20} />
          <span>Completed</span>
          <b>{completedCount}</b>
        </div>

        <div>
          <XCircle size={20} />
          <span>Missed</span>
          <b>{missed}</b>
        </div>

        <div>
          <Sparkles size={20} />
          <span>Mood</span>
          <b>{progress >= 70 ? "Productive" : progress >= 40 ? "Recoverable" : "Chaotic"}</b>
        </div>
      </div>

      <p className="reflection-message">
        {getReflectionMessage(personality, completedCount, totalGoals, progress)}
      </p>

      <div className="tomorrow-box">
        <Sunrise size={20} />
        <p>{getTomorrowSuggestion(progress)}</p>
      </div>
    </section>
  );
}

export default ReflectionCard;