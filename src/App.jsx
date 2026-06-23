import { useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import ChallengeMode from "./pages/ChallengeMode";

const personalities = {
  Coach: { emoji: "🛡️", quote: "Discipline today, freedom tomorrow." },
  Roast: { emoji: "💀", quote: "Bro really thought the assignment would complete itself." },
  Friendly: { emoji: "❤️", quote: "One small step at a time." },
  Meme: { emoji: "😂", quote: "Your CGPA is watching." },
  Monk: { emoji: "🧘", quote: "Focus on the present task." },
};

function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [personality, setPersonality] = useState("Coach");

  return (
    <div className="app">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        personalities={personalities}
        personality={personality}
        setPersonality={setPersonality}
      />

      {activePage === "Challenge Mode" ? (
        <ChallengeMode personality={personality} />
      ) : (
        <Dashboard personality={personality} />
      )}
    </div>
  );
}

export default App;