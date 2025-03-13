import { WordGrid } from "../components/WordGrid";
import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

test("WordGrid component renders", () => {
  render(<WordGrid />);

  const heading = screen.getByLabelText("word-grid");
  expect(heading).not.toBeNull();
});

test("adds a character to the input field and capitalises", () => {
  render(<WordGrid />);

  const input = screen.getAllByRole("textbox")[0] as HTMLInputElement;
  fireEvent.change(input, { target: { value: "a" } });

  expect(input.value).toBe("A");
});

test("disables input fields not in the active row", () => {
  render(<WordGrid />);

  const inputs = screen.getAllByRole("textbox");
  inputs.forEach((input, index) => {
    if (Math.floor(index / 5) !== 0) {
      expect(input).toBeDisabled();
    } else {
      expect(input).not.toBeDisabled();
    }
  });
});

test("submit button is disabled when current word length is less than 5", () => {
  render(<WordGrid />);

  const button = screen.getByRole("button", { name: /submit/i });
  expect(button).toBeDisabled();
});

test("submit button is enabled when current word length is 5", () => {
  render(<WordGrid />);

  const inputs = screen.getAllByRole("textbox");
  for (let i = 0; i < 5; i++) {
    fireEvent.change(inputs[i] as HTMLInputElement, { target: { value: "a" } });
  }

  const button = screen.getByRole("button", { name: /submit/i });
  expect(button).not.toBeDisabled();
});
