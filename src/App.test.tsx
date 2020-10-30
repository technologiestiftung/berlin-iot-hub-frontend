import React from "react";
import { render, screen, waitForElement } from "@testing-library/react";
import App from "./App";
import { StoreProvider } from "easy-peasy";
import store from "./state/store";

describe("Home page", () => {
  test("renders claim element", async () => {
    render(
      <StoreProvider store={store}>
        <App />
      </StoreProvider>
    );
    const claimElement = await screen.findByText(
      /Offene Datenplattform für IoT-Projekte/i
    );
    expect(claimElement).toBeInTheDocument();
  });
  test("displays headings of projects", async () => {
    render(
      <StoreProvider store={store}>
        <App />
      </StoreProvider>
    );

    const projectAHeading = await waitForElement(() =>
      screen.findByText("Test project A")
    );
    const projectBHeading = await waitForElement(() =>
      screen.findByText("Test project B")
    );
    expect(projectAHeading).toBeInTheDocument();
    expect(projectBHeading).toBeInTheDocument();
  });
});
