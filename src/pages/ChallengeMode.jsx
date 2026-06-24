import {
  Swords,
  Trophy,
  IndianRupee,
  Clock,
  Flame,
  Crown,
  Activity,
  History,
  Medal,
  Sparkles,
} from "lucide-react";

const refereeMessages = {
  Coach:
    "Stay disciplined. You are ahead, but the win is only safe when the work is done.",
  Roast: "Ravi is dangerously close to sponsoring your next pizza 🍕.",
  Friendly: "You are ahead. Keep the energy good and finish strong ❤️.",
  Meme: "Bro is speedrunning bankruptcy 💀.",
  Monk: "Consistency is quiet, but it always wins.",
};

function ChallengeMode({ personality, user }) {
  const firstName = user?.name?.split(" ")[0] || "You";

  const challenge = {
    name: "Weekly Grind Challenge",
    me: firstName,
    opponent: "Ravi",
    stake: 100,
    meCompleted: 8,
    meTotal: 10,
    opponentCompleted: 6,
    opponentTotal: 10,
    endsIn: "4 days 12 hours",
  };

  const pool = challenge.stake * 2;

  const mePercent = Math.round(
    (challenge.meCompleted / challenge.meTotal) * 100
  );

  const opponentPercent = Math.round(
    (challenge.opponentCompleted / challenge.opponentTotal) * 100
  );

  return (
    <main className="main challenge-page">
      <section className="challenge-minimal-hero">
        <div>
          <p className="eyebrow">Challenge Mode</p>
          <h2>{challenge.name}</h2>
          <p className="muted">
            {challenge.me} ⚔️ {challenge.opponent}
          </p>
        </div>

        <div className="pool-pill">
          <IndianRupee size={18} />
          ₹{pool} Pool
        </div>
      </section>

      <section className="minimal-section">
        <div className="section-title">
          <Swords size={20} />
          Live Duel
        </div>

        <div className="duel-row">
          <div>
            <h3>{challenge.me}</h3>
            <p>
              {challenge.meCompleted}/{challenge.meTotal} tasks
            </p>
          </div>
          <b>{mePercent}%</b>
        </div>

        <div className="minimal-meter">
          <div style={{ width: `${mePercent}%` }}></div>
        </div>

        <div className="duel-row">
          <div>
            <h3>{challenge.opponent}</h3>
            <p>
              {challenge.opponentCompleted}/{challenge.opponentTotal} tasks
            </p>
          </div>
          <b>{opponentPercent}%</b>
        </div>

        <div className="minimal-meter orange">
          <div style={{ width: `${opponentPercent}%` }}></div>
        </div>
      </section>

      <section className="minimal-section referee-minimal">
        <div className="section-title">
          <Sparkles size={20} />
          AI Referee
        </div>

        <p>{refereeMessages[personality]}</p>
        <span>{personality} referee active</span>
      </section>

      <section className="minimal-section">
        <div className="section-title">
          <Activity size={20} />
          Winning Probability
        </div>

        <div className="prediction-line">
          <span>{challenge.me}</span>
          <b>82%</b>
        </div>

        <div className="minimal-meter">
          <div style={{ width: "82%" }}></div>
        </div>

        <div className="prediction-line">
          <span>{challenge.opponent}</span>
          <b>18%</b>
        </div>

        <div className="minimal-meter orange">
          <div style={{ width: "18%" }}></div>
        </div>
      </section>

      <section className="minimal-section">
        <div className="section-title">
          <Clock size={20} />
          Challenge Details
        </div>

        <div className="clean-list">
          <div>
            <span>Stake</span>
            <b>₹{challenge.stake} each</b>
          </div>

          <div>
            <span>Winner gets</span>
            <b>₹{pool}</b>
          </div>

          <div>
            <span>Ends in</span>
            <b>{challenge.endsIn}</b>
          </div>

          <div>
            <span>Current leader</span>
            <b>{challenge.me}</b>
          </div>
        </div>
      </section>

      <section className="minimal-section">
        <div className="section-title">
          <Flame size={20} />
          Recent Activity
        </div>

        <div className="activity-feed">
          <p>✅ {challenge.me} completed DSA Assignment</p>
          <p>✅ {challenge.opponent} completed Gym</p>
          <p>❌ {challenge.opponent} missed ML Course</p>
          <p>🔥 {challenge.me}'s streak increased to 5</p>
          <p>⚡ AI referee updated win prediction</p>
        </div>
      </section>

      <section className="minimal-section">
        <div className="section-title">
          <Crown size={20} />
          Momentum Analysis
        </div>

        <div className="leader-box">
          <Trophy size={34} />
          <div>
            <p>Current Leader</p>
            <h3>{challenge.me}</h3>
            <span>
              {challenge.me} is leading by 2 tasks · Consistency score 91
            </span>
          </div>
        </div>
      </section>

      <section className="minimal-section">
        <div className="section-title">
          <Medal size={20} />
          Achievements
        </div>

        <div className="achievement-row">
          <span>🥇 Discipline Pays</span>
          <span>🔥 5 Day Streak</span>
          <span>⚡ Early Bird</span>
        </div>
      </section>

      <section className="minimal-section">
        <div className="section-title">
          <History size={20} />
          Challenge History
        </div>

        <div className="clean-list">
          <div>
            <span>Week 1</span>
            <b>{challenge.me} won</b>
          </div>

          <div>
            <span>Week 2</span>
            <b>{challenge.opponent} won</b>
          </div>

          <div>
            <span>Week 3</span>
            <b>{challenge.me} won</b>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ChallengeMode;