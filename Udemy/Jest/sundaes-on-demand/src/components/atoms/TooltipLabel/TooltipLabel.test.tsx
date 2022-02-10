import React from "react";

import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TooltipLabel from "./TooltipLabel";

const testMessage = "test label";
const testTooltipMessage = "tooltip test message";

test("Tooltip  functionality", async () => {
  render(
    <TooltipLabel message={testMessage} tooltipMessage={testTooltipMessage} />
  );
  const messageElement = screen.getByText(testMessage);
  let tooltipElement: HTMLElement | null | void = screen.queryByRole("tooltip");

  expect(tooltipElement).toBeFalsy();

  // on hover
  userEvent.hover(messageElement);

  tooltipElement = screen.getByRole("tooltip");

  expect(tooltipElement).toBeInTheDocument();
  expect(tooltipElement).toHaveTextContent(testTooltipMessage);

  // on unhover
  userEvent.unhover(messageElement);

  tooltipElement = await waitForElementToBeRemoved(() =>
    screen.queryByRole("tooltip")
  );

  expect(tooltipElement).toBeNull();
});
