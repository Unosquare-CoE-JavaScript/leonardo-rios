import { render, screen } from "../../../utils/test-utils";

import Options from "./Options";
import ScoopOption from "../../molecules/ScoopOption/ScoopOption";
import ToppingOption from "../../molecules/ToppingOption/ToppingOption";
import userEvent from "@testing-library/user-event";

test("display image for each scoop option ", async () => {
  render(<Options optionType="scoops" ItemComponent={ScoopOption} />);
  const scoopsImages: HTMLImageElement[] = await screen.findAllByRole("img", {
    name: /scoop$/i,
  });

  expect(scoopsImages).toHaveLength(2);
  const texts = scoopsImages.map((e) => e.alt);
  expect(texts).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("display image for each topping option", async () => {
  render(<Options optionType="toppings" ItemComponent={ToppingOption} />);
  const toppingImages: HTMLImageElement[] = await screen.findAllByRole("img", {
    name: /topping$/i,
  });

  expect(toppingImages).toHaveLength(3);
  const text = toppingImages.map((e) => e.alt);
  expect(text).toEqual([
    "Cherries topping",
    "M&Ms topping",
    "Hot fudge topping",
  ]);
});

test("update scoop subtotal when scoops change", async () => {
  render(<Options optionType="scoops" ItemComponent={ScoopOption} />);
  const scoopSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopSubtotal).toHaveTextContent("0.00");

  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");

  expect(scoopSubtotal).toHaveTextContent("2.00");

  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "2");

  expect(scoopSubtotal).toHaveTextContent("6.00");
});

test("update topping subtotal when toppings change", async () => {
  render(<Options optionType="toppings" ItemComponent={ToppingOption} />);
  const toppingSubtotal = screen.getByText("Toppings total: $", {
    exact: false,
  });
  expect(toppingSubtotal).toHaveTextContent("0.00");

  const cherriesInput = await screen.findByRole("checkbox", {
    name: "Cherries",
  });

  userEvent.clear(cherriesInput);
  userEvent.click(cherriesInput);

  expect(toppingSubtotal).toHaveTextContent("1.50");

  const mAndmInput = await screen.findByRole("checkbox", {
    name: "M&Ms",
  });
  userEvent.clear(mAndmInput);
  userEvent.click(mAndmInput);

  expect(toppingSubtotal).toHaveTextContent("3.00");

  userEvent.click(cherriesInput);
  expect(toppingSubtotal).toHaveTextContent("1.50");
});
