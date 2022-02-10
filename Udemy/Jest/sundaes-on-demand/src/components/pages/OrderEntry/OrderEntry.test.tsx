import { render, screen, waitFor } from "../../../utils/test-utils";
import OrderEntry from "./OrderEntry";
import { rest } from "msw";
import { server } from "../../../mocks/servers";
import { getHost } from "../../../utils/utils";
import userEvent from "@testing-library/user-event";

test("handles error for scoops and toppings router", async () => {
  server.resetHandlers(
    rest.get(`${getHost()}/scoops`, (req, res, ctx) => res(ctx.status(500))),
    rest.get(`${getHost()}/toppings`, (req, res, ctx) => res(ctx.status(500)))
  );

  render(<OrderEntry />);

  const allAlerts = await waitFor(async () => {
    const alerts = await screen.findAllByRole("alert");
    expect(alerts).toHaveLength(2);
  });
});

describe("grand total", () => {
  test("grand total updates properly if topping is added first", async () => {
    render(<OrderEntry />);
    const total = await screen.findByRole("heading", {
      name: /grand total/i,
    });

    expect(total).toHaveTextContent("0.00");

    const scoopInput = await screen.findByRole("spinbutton", {
      name: /Vanilla/i,
    });
    const toppingInput = await screen.findByRole("checkbox", {
      name: /Cherries/i,
    });

    userEvent.clear(toppingInput);
    userEvent.click(toppingInput);

    await waitFor(() => expect(total).toHaveTextContent("1.50"));

    userEvent.clear(scoopInput);
    userEvent.type(scoopInput, "1");

    await waitFor(() => expect(total).toHaveTextContent("3.50"));
  });
  test("grand total updates properly if scoop is added first", async () => {
    render(<OrderEntry />);
    const total = await screen.findByRole("heading", {
      name: /grand total/i,
    });

    expect(total).toHaveTextContent("0.00");

    const scoopInput = await screen.findByRole("spinbutton", {
      name: /Vanilla/i,
    });
    const toppingInput = await screen.findByRole("checkbox", {
      name: /Cherries/i,
    });

    userEvent.clear(scoopInput);
    userEvent.type(scoopInput, "1");

    expect(total).toHaveTextContent("2.00");

    userEvent.clear(toppingInput);
    userEvent.click(toppingInput);

    expect(total).toHaveTextContent("3.50");
  });
  test("grand total update properly if item is removed", async () => {
    render(<OrderEntry />);
    const total = await screen.findByRole("heading", {
      name: /grand total/i,
    });

    expect(total).toHaveTextContent("0.00");

    const toppingInput = await screen.findByRole("checkbox", {
      name: /Cherries/i,
    });

    userEvent.clear(toppingInput);
    userEvent.click(toppingInput);

    await waitFor(() => expect(total).toHaveTextContent("1.50"));

    userEvent.click(toppingInput);

    await waitFor(() => expect(total).toHaveTextContent("0.00"));
  });
});
