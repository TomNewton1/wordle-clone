import { useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setGrid } from "../store/gridSlice";
import "./word-grid.css";
import axios from "axios";

const WORD_LENGTH = 5;

export const WordGrid = () => {
  const dispatch = useDispatch();
  const grid = useSelector((state: RootState) => state.grid.grid);
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    const updatedGrid = [...grid];
    updatedGrid[index] = { ...updatedGrid[index], letter: value.toUpperCase() };
    dispatch(setGrid(updatedGrid));

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
        .slice(
          activeWordIndex * WORD_LENGTH,
          (activeWordIndex + 1) * WORD_LENGTH
        )
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
          updatedGrid[activeWordIndex * WORD_LENGTH + index] = {
            letter: result.letter,
            status: result.status,
          };
        }
      );
      dispatch(setGrid(updatedGrid));
      setActiveWordIndex(activeWordIndex + 1);
    } catch (error) {
      console.error(error);
    }
  };

  const currentWord = useMemo(() => {
    const start = activeWordIndex * WORD_LENGTH;
    const end = start + WORD_LENGTH;
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
            disabled={Math.floor(index / WORD_LENGTH) !== activeWordIndex}
            className={cell.status}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
          />
        ))}
      </div>
      <button
        onClick={handleSubmit}
        disabled={currentWord.length < WORD_LENGTH}
      >
        Submit
      </button>
    </div>
  );
};
