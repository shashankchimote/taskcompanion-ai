import { Flame, Crown, Zap, ShieldCheck } from "lucide-react";

function getLevel(streak) {
  if (streak >= 50) return "Legendary Human";
  if (streak >= 26) return "Discipline Master";
  if (streak >= 11) return "Focused Warrior";
  if (streak >= 4) return "Consistent";
  return "Beginner";
}

function getStreakMessage(personality, streak) {
  if (personality === "Roast") {
    return `Imagine breaking a ${streak}-day streak now. That would be a historic fumble.`;
  }

  if (personality === "Friendly") {
    return `${streak} days of showing up. Proud of you. Keep it gentle, keep it steady.`;
  }

  if (personality === "Meme") {
    return `Bro unlocked productivity DLC: ${streak}-day streak edition 😂.`;
  }

  if (personality === "Monk") {
    return `${streak} days of presence. The streak is proof of quiet discipline.`;
  }

  return `${streak} days of consistency. Protect the streak.`;
}

function StreakCard({ personality, progress }) {
  const currentStreak = progress >= 70 ? 7 : 6;
  const longestStreak = 23;
  const disciplineScore = Math.min(100, 50 + currentStreak * 5);
  const level = getLevel(currentStreak);

  return (
    <section className="streak-card">
      <div className="streak-header">
        <div>
          <p className="eyebrow">Streak System</p>
          <h3><Flame size={22} /> Discipline Streak</h3>
        </div>

        <div className="streak-flame">🔥</div>
      </div>

      <div className="streak-main">
        <div>
          <span>Current Streak</span>
          <h2>{currentStreak} days</h2>
        </div>

        <div className="streak-ring">
          <b>{disciplineScore}</b>
          <small>score</small>
        </div>
      </div>

      <div className="streak-stats">
        <div>
          <Crown size={19} />
          <span>Longest</span>
          <b>{longestStreak} days</b>
        </div>

        <div>
          <Zap size={19} />
          <span>Level</span>
          <b>{level}</b>
        </div>

        <div>
          <ShieldCheck size={19} />
          <span>Status</span>
          <b>{progress >= 70 ? "Protected" : "At Risk"}</b>
        </div>
      </div>

      <p className="streak-message">
        {getStreakMessage(personality, currentStreak)}
      </p>
    </section>
  );
}

export default StreakCard;