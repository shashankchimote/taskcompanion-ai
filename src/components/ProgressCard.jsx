function ProgressCard({ progress }) {
  return (
    <section className="progress-card">
      <div>
        <h3>Today's Progress</h3>
        <p>{progress}% completed</p>
      </div>

      <div className="progress-bar">
        <div style={{ width: `${progress}%` }}></div>
      </div>
    </section>
  );
}

export default ProgressCard;