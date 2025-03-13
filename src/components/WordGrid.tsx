import { useState, useMemo } from "react";
import "./word-grid.css";
import axios from "axios";

export const WordGrid = () => {
  const [grid, setGrid] = useState(Array(30).fill({ letter: "", status: "" }));
  const [activeWordIndex, setCurrentWordIndex] = useState(0);

  const handleChange = (index: number, value: string) => {
    const newGrid = [...grid];
    newGrid[index] = { ...newGrid[index], letter: value.toUpperCase() };
    setGrid(newGrid);
  };

  const handleSubmit = async () => {
    //TODO: Implement the API call
    try {
      const response = await axios.post("api/validate", grid);
      setGrid(response.data);
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
            disabled={Math.floor(index / 5) !== activeWordIndex}
            className={cell.status}
          />
        ))}
      </div>
      <button onClick={handleSubmit} disabled={currentWord.length < 5}>
        Submit
      </button>
    </div>
  );
};
