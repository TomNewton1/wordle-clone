import { WordGrid } from "../components/WordGrid";
import { renderWithProviders } from "./testUtils";
import { screen, fireEvent } from "@testing-library/react";
import { expect, test } from "vitest";
import "@testing-library/jest-dom";

test("WordGrid component renders", () => {
  renderWithProviders(<WordGrid />);

  const heading = screen.getByLabelText("word-grid");
  expect(heading).not.toBeNull();
});

test("adds a character to the input field and capitalises", () => {
  renderWithProviders(<WordGrid />);

  const input = screen.getAllByRole("textbox")[0] as HTMLInputElement;
  fireEvent.change(input, { target: { value: "a" } });

  expect(input.value).toBe("A");
});

test("disables input fields not in the active row", () => {
  renderWithProviders(<WordGrid />);

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
  renderWithProviders(<WordGrid />);

  const button = screen.getByRole("button", { name: /submit/i });
  expect(button).toBeDisabled();
});

test("submit button is enabled when current word length is 5", () => {
  renderWithProviders(<WordGrid />);

  const inputs = screen.getAllByRole("textbox");
  for (let i = 0; i < 5; i++) {
    fireEvent.change(inputs[i] as HTMLInputElement, { target: { value: "a" } });
  }

  const button = screen.getByRole("button", { name: /submit/i });
  expect(button).not.toBeDisabled();
});

test("only allows alphabetical characters to be input on keydown", () => {
  renderWithProviders(<WordGrid />);

  const input = screen.getAllByRole("textbox")[0] as HTMLInputElement;

  fireEvent.keyDown(input, { key: "1" });
  expect(input.value).toBe("");

  fireEvent.keyDown(input, { key: "!" });
  expect(input.value).toBe("");

  fireEvent.keyDown(input, { key: "a" });
  fireEvent.change(input, { target: { value: "a" } });
  expect(input.value).toBe("A");

  fireEvent.keyDown(input, { key: "B" });
  fireEvent.change(input, { target: { value: "B" } });
  expect(input.value).toBe("B");
});
