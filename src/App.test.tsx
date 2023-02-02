import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

import { Provider } from "react-redux";
import { createTestStore } from "./testStore";

describe("<App />", () => {
  let store;

  beforeEach(() => {
    store = createTestStore();
  });

  it("renders header text", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const header = screen.getByText(/React Redux Redux Saga - Playground/i);
    expect(header).toBeInTheDocument();
  });
});
