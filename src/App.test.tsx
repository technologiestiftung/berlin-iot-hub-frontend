import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import { StoreProvider } from "easy-peasy";
import store from "./state/store";

test("renders claim element", () => {
  const { getByText } = render(
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
  );
  const claimElement = getByText(/Offene Datenplattform für IoT-Projekte/i);
  expect(claimElement).toBeInTheDocument();
});
