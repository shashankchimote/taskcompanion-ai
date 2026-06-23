import { Clock, Trash2, CheckCircle2 } from "lucide-react";

function GoalPoster({ goal, onDelete, onComplete }) {
  const Icon = goal.icon;

  return (
    <div className={`poster-wrap ${goal.completed ? "completed-wrap" : ""}`}>
      <div className="pin"></div>
      <div className="rope left"></div>
      <div className="rope right"></div>

      <div className="poster">
        <button className="complete-btn" onClick={() => onComplete(goal.id)}>
          <CheckCircle2 size={18} />
        </button>

        <button className="delete-btn" onClick={() => onDelete(goal.id)}>
          <Trash2 size={17} />
        </button>

        <div className="poster-top"></div>

        <div className="icon-circle">
          <Icon size={30} />
        </div>

        <h3>{goal.title}</h3>
        <div className="due-pill">Due: {goal.due}</div>

        <p className="time">
          <Clock size={15} /> {goal.time}
        </p>

        {goal.completed && <p className="done-text">Completed ✅</p>}

        <div className={`priority-strip ${goal.type}`}>
          {goal.priority}
        </div>
      </div>
    </div>
  );
}

export default GoalPoster;