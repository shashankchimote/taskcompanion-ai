import { CalendarDays, Flame } from "lucide-react";

function ProductivityHeatmap() {
  const days = [
    20, 45, 70, 85, 35, 10, 55,
    65, 88, 42, 77, 91, 30, 48,
    25, 60, 82, 95, 72, 18, 40,
    58, 74, 90, 67, 38, 12, 50,
  ];

  function getLevel(value) {
    if (value >= 80) return "heat-4";
    if (value >= 60) return "heat-3";
    if (value >= 40) return "heat-2";
    if (value >= 20) return "heat-1";
    return "heat-0";
  }

  return (
    <section className="heatmap-card">
      <div className="heatmap-header">
        <div>
          <p className="eyebrow">Productivity Heatmap</p>
          <h3><CalendarDays size={22} /> Consistency Map</h3>
        </div>

        <div className="heatmap-badge">
          <Flame size={18} />
          28 Days
        </div>
      </div>

      <div className="heatmap-grid">
        {days.map((value, index) => (
          <div
            key={index}
            className={`heat-cell ${getLevel(value)}`}
            title={`Day ${index + 1}: ${value}%`}
          ></div>
        ))}
      </div>

      <div className="heatmap-legend">
        <span>Low</span>
        <div className="heat-cell heat-0"></div>
        <div className="heat-cell heat-1"></div>
        <div className="heat-cell heat-2"></div>
        <div className="heat-cell heat-3"></div>
        <div className="heat-cell heat-4"></div>
        <span>High</span>
      </div>

      <p className="heatmap-insight">
        Your strongest productivity clusters appear around weekdays. Weekends need lighter but consistent task planning.
      </p>
    </section>
  );
}

export default ProductivityHeatmap;