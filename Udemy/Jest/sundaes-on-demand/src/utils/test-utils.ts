import { render } from "@testing-library/react";
import { AppProvider } from "../context/context";
import React from "react";

const renderWithContext = (ui: React.ReactElement, options?: Object) =>
  render(ui, { wrapper: AppProvider, ...options });

export * from "@testing-library/react";

export { renderWithContext as render };
