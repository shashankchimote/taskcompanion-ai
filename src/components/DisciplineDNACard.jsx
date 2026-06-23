import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
import { Dna, Sparkles } from "lucide-react";

function DisciplineDNACard({ progress }) {
  const data = [
    { area: "Academics", score: 78 },
    { area: "Fitness", score: 94 },
    { area: "Consistency", score: progress },
    { area: "Focus", score: 86 },
    { area: "Challenge", score: 76 },
  ];

  const overallScore = Math.round(
    data.reduce((sum, item) => sum + item.score, 0) / data.length
  );

  return (
    <section className="dna-card">
      <div className="dna-header">
        <div>
          <p className="eyebrow">Discipline DNA</p>
          <h3>
            <Dna size={22} /> Productivity Profile
          </h3>
        </div>

        <div className="dna-score">
          <span>{overallScore}</span>
          <small>overall</small>
        </div>
      </div>

      <div className="dna-content">
        <div className="dna-chart">
          <ResponsiveContainer width="100%" height={330}>
            <RadarChart data={data}>
              <PolarGrid />
              <PolarAngleAxis dataKey="area" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar
                name="Score"
                dataKey="score"
                stroke="#0b6b4f"
                fill="#0b6b4f"
                fillOpacity={0.28}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="dna-list">
          {data.map((item) => (
            <div key={item.area}>
              <span>{item.area}</span>
              <b>{item.score}%</b>
            </div>
          ))}
        </div>
      </div>

      <div className="dna-insight">
        <Sparkles size={18} />
        <p>
          Your strongest discipline signal is Fitness. Academics and Challenge
          Spirit can become stronger with consistent morning work.
        </p>
      </div>
    </section>
  );
}

export default DisciplineDNACard;