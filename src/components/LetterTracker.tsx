import { useSelector } from "react-redux";
import "./letter-tracker.css";
import { RootState } from "../store/store";

export const LetterTracker = () => {
  const grid = useSelector((state: RootState) => state.grid.grid);

  const letterMap = new Map<string, string>();

  grid.forEach((cell) => {
    if (cell.status !== "") {
      const currentStatus = letterMap.get(cell.letter);
      if (
        !currentStatus ||
        (currentStatus === "present" && cell.status === "correct")
      ) {
        letterMap.set(cell.letter, cell.status);
      }
    }
  });

  const triedLetters = Array.from(letterMap.entries())
    .map(([letter, status]) => ({ letter, status }))
    .sort((a, b) => a.letter.localeCompare(b.letter));

  return (
    <div className="letter-tracker">
      <div className="letters">
        {triedLetters.map((cell, index) => (
          <span key={index} className={`letter ${cell.status}`}>
            {cell.letter}
          </span>
        ))}
      </div>
    </div>
  );
};
