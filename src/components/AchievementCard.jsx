import { Award, Flame, Dumbbell, BookOpen, Swords, Crown } from "lucide-react";

function getCategoryRate(goals, keywords) {
  const matched = goals.filter((goal) =>
    keywords.some((word) => goal.title.toLowerCase().includes(word))
  );

  if (matched.length === 0) return 0;

  const completed = matched.filter((goal) => goal.completed).length;
  return Math.round((completed / matched.length) * 100);
}

function AchievementCard({ progress, goals }) {
  const gymRate = getCategoryRate(goals, ["gym", "workout"]);
  const studyRate = getCategoryRate(goals, [
    "dsa",
    "study",
    "assignment",
    "exam",
    "ml",
    "course",
    "dbms",
  ]);

  const currentStreak = progress >= 70 ? 7 : 3;
  const challengeWins = 2;

  const achievements = [
    {
      icon: Flame,
      title: "7 Day Streak",
      desc: "Protected your streak for 7 days.",
      unlocked: currentStreak >= 7,
    },
    {
      icon: Dumbbell,
      title: "Gym Warrior",
      desc: "Maintained strong fitness consistency.",
      unlocked: gymRate >= 80,
    },
    {
      icon: BookOpen,
      title: "Study Beast",
      desc: "Completed academic tasks consistently.",
      unlocked: studyRate >= 70,
    },
    {
      icon: Swords,
      title: "Challenge Champion",
      desc: "Won multiple accountability battles.",
      unlocked: challengeWins >= 3,
    },
    {
      icon: Crown,
      title: "Discipline Master",
      desc: "Reached elite daily productivity.",
      unlocked: progress >= 90,
    },
  ];

  const unlockedCount = achievements.filter((item) => item.unlocked).length;

  return (
    <section className="achievement-card">
      <div className="achievement-header">
        <div>
          <p className="eyebrow">Achievement System</p>
          <h3>
            <Award size={22} /> Badge Collection
          </h3>
        </div>

        <div className="achievement-count">
          {unlockedCount}/{achievements.length} unlocked
        </div>
      </div>

      <div className="achievement-grid">
        {achievements.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className={`achievement-item ${
                item.unlocked ? "unlocked" : "locked"
              }`}
            >
              <Icon size={24} />
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
              <span>{item.unlocked ? "Unlocked" : "Locked"}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default AchievementCard;