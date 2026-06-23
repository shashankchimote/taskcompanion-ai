import { Trophy } from "lucide-react";

function BottomQuote({ aiMessage, personality }) {
  return (
    <section className="bottom-quote">
      <span>❝</span>
      {aiMessage ||
        `Choose a personality, add your tasks, and TaskCompanion will plan your day in ${personality} mode.`}
      <Trophy size={25} />
    </section>
  );
}

export default BottomQuote;