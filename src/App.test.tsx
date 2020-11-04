import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { StoreProvider } from "easy-peasy";
import store from "./state/store";
import { ThemeProvider } from "theme-ui";
import theme from "./style/theme";
import { act } from "react-dom/test-utils";

window.scrollTo = jest.fn();

describe("App", () => {
  test("initially renders claim element", () => {
    render(
      <StoreProvider store={store}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </StoreProvider>
    );

    const claimElement = screen.getByText(
      /Offene Datenplattform für IoT-Projekte/i
    );
    expect(claimElement).toBeInTheDocument();
  });

  test("displays headings of projects from API", async () => {
    render(
      <StoreProvider store={store}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </StoreProvider>
    );

    const projectAHeading = await screen.findByText(/Test project A/i);
    const projectBHeading = await screen.findByText(/Test project B/i);
    expect(projectAHeading).toBeInTheDocument();
    expect(projectBHeading).toBeInTheDocument();
  });

  test("displays cookie disclaimer", () => {
    render(
      <StoreProvider store={store}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </StoreProvider>
    );

    const cookieBanner = screen.getByText(/Diese Webseite verwendet Cookies/i);
    expect(cookieBanner).toBeInTheDocument();
  });

  test("allows navigating to project page", async () => {
    await act(async () => {
      render(
        <StoreProvider store={store}>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </StoreProvider>
      );

      await act(async () => {
        userEvent.click(await screen.findByText(/Test project A/i));
      });

      const sensorCount = await screen.findByText(/Anzahl der Sensoren/i);
      expect(sensorCount).toBeInTheDocument();

      const radioInputItems = await screen.findAllByLabelText(
        /device description/i
      );
      expect(radioInputItems).toHaveLength(3);
    });
  });
});
