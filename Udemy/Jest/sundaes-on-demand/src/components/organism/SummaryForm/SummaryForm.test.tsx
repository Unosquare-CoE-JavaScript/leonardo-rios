import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import SummaryForm from "./SummaryForm";

test("checkbox functionality", () => {
  render(<SummaryForm />);
  const checkBox = screen.getByRole("checkbox");
  const button = screen.getByRole("button");

  expect(checkBox).not.toBeChecked();
  expect(button).toBeDisabled();

  fireEvent.click(checkBox);

  expect(button).toBeEnabled();
  expect(checkBox).toBeChecked();

  fireEvent.click(checkBox);

  expect(button).toBeDisabled();
});
