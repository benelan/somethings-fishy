import React from "react";
import { render, screen } from "@testing-library/react";
import Landing from "./Landing";

test("renders app title", () => {
  render(<Landing />);
  const titleElement = screen.getByText(/surfs up/i);
  expect(titleElement).toBeInTheDocument();
});
