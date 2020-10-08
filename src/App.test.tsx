import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  const { getByText } = render(<App />);
  const claimElement = getByText(/Offene Datenplattform für IoT-Projekte/i);
  expect(claimElement).toBeInTheDocument();
});
