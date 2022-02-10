import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { toCamelCase } from "./components/Button";

const primaryColor = "mediumVioletRed";
const secondaryColor = "midnightBlue";
const camelPrimary = toCamelCase(primaryColor);
const camelSecondary = toCamelCase(secondaryColor);

test("button changes color when clicked", () => {
  render(<App />);
  const button = screen.getByRole("button", {
    name: `Change to ${camelSecondary}`,
  });

  expect(button).toHaveStyle({ backgroundColor: primaryColor });

  fireEvent.click(button);

  expect(button).toHaveStyle({ backgroundColor: secondaryColor });
  expect(button).toHaveTextContent(`Change to ${camelPrimary}`);
});

test("button enabled/disabled test on check", () => {
  render(<App />);
  const button = screen.getByRole("button", {
    name: `Change to ${camelSecondary}`,
  });
  const checkBox = screen.getByRole("checkbox");

  expect(button).toBeEnabled();
  expect(checkBox).not.toBeChecked();

  fireEvent.click(checkBox);

  expect(checkBox).toBeChecked();
  expect(button).toBeDisabled();
});

test("button primary color test when disabled", () => {
  render(<App />);
  const button = screen.getByRole("button", {
    name: `Change to ${camelSecondary}`,
  });
  const checkBox = screen.getByRole("checkbox");

  fireEvent.click(checkBox);

  expect(button).toHaveStyle({ backgroundColor: "gray" });

  fireEvent.click(checkBox);

  expect(button).toHaveStyle({ backgroundColor: primaryColor });
});

test("button secondary color test when disabled", () => {
  render(<App />);
  const button = screen.getByRole("button", {
    name: `Change to ${camelSecondary}`,
  });
  const checkBox = screen.getByRole("checkbox");

  fireEvent.click(button);
  fireEvent.click(checkBox);

  expect(button).toHaveStyle({ backgroundColor: "gray" });

  fireEvent.click(checkBox);
  expect(button).toHaveStyle({ backgroundColor: secondaryColor });
});

describe("convert a backgroundColor to a legible text in camel case", () => {
  test("one word test", () => {
    expect(toCamelCase("red")).toHaveTextContent("red");
  });
  test("two word test", () => {
    expect(toCamelCase("midnightBlue")).toHaveTextContent("midnight Blue");
  });
  test("multiple word test", () => {
    expect(toCamelCase("mediuemVioletRed")).toHaveTextContent(
      "mediuem Violet Red"
    );
  });
});
