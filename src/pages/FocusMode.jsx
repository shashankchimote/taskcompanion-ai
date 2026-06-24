import { useEffect, useState } from "react";
import {
  Clock,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Target,
} from "lucide-react";

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function FocusMode({ goals, toggleComplete }) {
  const [selectedTaskId, setSelectedTaskId] = useState(() => {
    return localStorage.getItem("focusTaskId") || "";
  });

  const [duration, setDuration] = useState(() => {
    return Number(localStorage.getItem("focusDuration")) || 25;
  });

  const [secondsLeft, setSecondsLeft] = useState(() => {
    return Number(localStorage.getItem("focusSecondsLeft")) || 25 * 60;
  });

  const [running, setRunning] = useState(false);

  const [stats, setStats] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("focusStats")) || {
        sessions: 0,
        minutes: 0,
      };
    } catch {
      return { sessions: 0, minutes: 0 };
    }
  });

  const selectedTask = goals.find((goal) => String(goal.id) === String(selectedTaskId));

  useEffect(() => {
    localStorage.setItem("focusTaskId", selectedTaskId);
  }, [selectedTaskId]);

  useEffect(() => {
    localStorage.setItem("focusDuration", String(duration));
  }, [duration]);

  useEffect(() => {
    localStorage.setItem("focusSecondsLeft", String(secondsLeft));
  }, [secondsLeft]);

  useEffect(() => {
    localStorage.setItem("focusStats", JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setRunning(false);
          setStats((old) => ({
            sessions: old.sessions + 1,
            minutes: old.minutes + duration,
          }));
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [running, duration]);

  function changeDuration(value) {
    setDuration(value);
    setSecondsLeft(value * 60);
    setRunning(false);
  }

  function resetTimer() {
    setSecondsLeft(duration * 60);
    setRunning(false);
  }

  function markComplete() {
    if (!selectedTask) return;
    toggleComplete(selectedTask.id);
  }

  const progress =
    duration * 60 === 0
      ? 0
      : Math.round(((duration * 60 - secondsLeft) / (duration * 60)) * 100);

  return (
    <main className="main focus-page">
      <header className="topbar">
        <div>
          <h2>Focus Mode 🧘</h2>
          <p>Select one task, start a timer, and work without distractions.</p>
        </div>
      </header>

      <section className="focus-card">
        <div className="focus-task-select">
          <label>Current Mission</label>

          <select
            value={selectedTaskId}
            onChange={(e) => setSelectedTaskId(e.target.value)}
          >
            <option value="">Choose a task</option>
            {goals.map((goal) => (
              <option key={goal.id} value={goal.id}>
                {goal.title}
              </option>
            ))}
          </select>
        </div>

        <div className="focus-mission">
          <p className="eyebrow">Now Focusing On</p>
          <h3>
            <Target size={24} />
            {selectedTask ? selectedTask.title : "No task selected"}
          </h3>
          <span>
            {selectedTask
              ? `${selectedTask.priority} · ${selectedTask.time}`
              : "Choose a task from the dropdown above"}
          </span>
        </div>

        <div className="timer-minimal">
            <h1>{formatTime(secondsLeft)}</h1>
            <p>{duration} min focus session</p>

            <div className="focus-progress">
             <div style={{ width: `${progress}%` }}></div>
            </div>
        </div>

        <div className="duration-buttons">
          {[25, 45, 60].map((value) => (
            <button
              key={value}
              className={duration === value ? "selected-duration" : ""}
              onClick={() => changeDuration(value)}
            >
              {value} min
            </button>
          ))}
        </div>

        <div className="focus-actions">
          <button className="generate-btn" onClick={() => setRunning(!running)}>
            {running ? <Pause size={18} /> : <Play size={18} />}
            {running ? "Pause" : "Start Focus"}
          </button>

          <button className="soft-btn" onClick={resetTimer}>
            <RotateCcw size={18} /> Reset
          </button>

          <button className="soft-btn" onClick={markComplete}>
            <CheckCircle2 size={18} /> Mark Complete
          </button>
        </div>
      </section>

      <section className="focus-stats">
        <div>
          <span>Focus Sessions</span>
          <b>{stats.sessions}</b>
        </div>

        <div>
          <span>Total Focus Minutes</span>
          <b>{stats.minutes}</b>
        </div>

        <div>
          <span>Current Status</span>
          <b>{running ? "In Focus" : "Ready"}</b>
        </div>
      </section>
    </main>
  );
}

export default FocusMode;