import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { StoreProvider } from "easy-peasy";
import store from "./state/store";
import { ThemeProvider } from "theme-ui";
import theme from "./style/theme";

window.scrollTo = jest.fn();

describe("Home page / project overview", () => {
  test("renders claim element", () => {
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

  test("displays headings of projects", async () => {
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
});
