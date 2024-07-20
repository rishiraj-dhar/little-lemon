import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import App from "./App";

it("renders `<App />` correctly", () => {
  render(<App />);
  const heading = screen.getByRole("heading");
  expect(heading).toHaveTextContent(/^Little Lemon$/);
});
