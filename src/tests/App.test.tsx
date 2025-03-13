import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import App from "../App";

test("Wordle title renders", () => {
  const app = render(<App />);
  const title = app.getByText("Wordle");
  expect(title).not.toBeNull();
});
