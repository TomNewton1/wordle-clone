import { useState, useMemo, useRef } from "react";
import "./word-grid.css";
import axios from "axios";

export const WordGrid = () => {
  const [grid, setGrid] = useState(Array(30).fill({ letter: "", status: "" }));
  const [activeWordIndex, setCurrentWordIndex] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    const newGrid = [...grid];
    newGrid[index] = { ...newGrid[index], letter: value.toUpperCase() };
    setGrid(newGrid);

    if (value && index < grid.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow only letters (a-z, A-Z), Backspace, and basic navigation keys
    // TODO: Imporve this so that current letter remains selected allowing user to backsace
    if (
      !/^[a-zA-Z]$/.test(event.key) &&
      !["Backspace", "ArrowLeft", "ArrowRight", "Tab"].includes(event.key)
    ) {
      event.preventDefault();
    }
  };

  const handleSubmit = async () => {
    try {
      const currentWordLetters = grid
        .slice(activeWordIndex * 5, (activeWordIndex + 1) * 5)
        .map((cell) => cell.letter)
        .join("");

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/validate-word/`,
        {
          word: currentWordLetters,
        }
      );

      const updatedGrid = [...grid];
      response.data.forEach(
        (result: { letter: string; status: string }, index: number) => {
          updatedGrid[activeWordIndex * 5 + index] = {
            letter: result.letter,
            status: result.status,
          };
        }
      );
      setGrid(updatedGrid);
      setCurrentWordIndex(activeWordIndex + 1);
    } catch (error) {
      console.error(error);
    }
  };

  const currentWord = useMemo(() => {
    const start = activeWordIndex * 5;
    const end = start + 5;
    return grid
      .slice(start, end)
      .map((cell) => cell.letter)
      .join("");
  }, [grid, activeWordIndex]);

  return (
    <div className="grid-container" aria-label="word-grid">
      <div className="grid">
        {grid.map((cell, index) => (
          <input
            type="text"
            key={index}
            maxLength={1}
            value={cell.letter}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={Math.floor(index / 5) !== activeWordIndex}
            className={cell.status}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
          />
        ))}
      </div>
      <button onClick={handleSubmit} disabled={currentWord.length < 5}>
        Submit
      </button>
    </div>
  );
};
