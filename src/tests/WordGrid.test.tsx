import { WordGrid } from "../components/WordGrid";
import { expect, test } from "vitest";
import { render } from "vitest-browser-react";

test("WordGrid component renders", () => {
  const wordGrid = render(<WordGrid />);

  const heading = wordGrid.getByText("WordGrid");
  expect(heading).not.toBeNull();
});
