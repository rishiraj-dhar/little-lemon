import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import App from "./App";

it("renders `<App />` correctly", () => {
  render(<App />);
  expect(screen.getByRole("heading")).toHaveTextContent("Little Lemon");
});