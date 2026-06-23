import { Award, Flame, Dumbbell, BookOpen, Swords, Crown } from "lucide-react";

function AchievementCard({ progress }) {
  const achievements = [
    {
      icon: Flame,
      title: "7 Day Streak",
      desc: "Showed up consistently.",
      unlocked: progress >= 50,
    },
    {
      icon: Dumbbell,
      title: "Gym Warrior",
      desc: "Fitness habit protected.",
      unlocked: true,
    },
    {
      icon: BookOpen,
      title: "Study Beast",
      desc: "Academic grind activated.",
      unlocked: progress >= 70,
    },
    {
      icon: Swords,
      title: "Challenge Fighter",
      desc: "Entered accountability mode.",
      unlocked: true,
    },
    {
      icon: Crown,
      title: "Discipline Master",
      desc: "Elite consistency level.",
      unlocked: progress >= 90,
    },
  ];

  return (
    <section className="achievement-card">
      <div className="achievement-header">
        <div>
          <p className="eyebrow">Achievement System</p>
          <h3><Award size={22} /> Badges Unlocked</h3>
        </div>
      </div>

      <div className="achievement-grid">
        {achievements.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className={`achievement-item ${item.unlocked ? "unlocked" : "locked"}`}
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