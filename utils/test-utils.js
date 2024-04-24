import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import setupStore from "../Redux/store";

import { NavigationContainer } from "@react-navigation/native";

export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

/* eslint-disable no-undef, import/no-extraneous-dependencies */

/**
 * Render given JSX inside Navigation container.
 * This should be used for rendering whole navigators as used by real app.
 */
export function renderNavigator(ui) {
  return render(<NavigationContainer>{ui}</NavigationContainer>);
}
