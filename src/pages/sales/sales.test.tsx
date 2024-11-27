import { cleanup, render, screen } from "@solidjs/testing-library";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, afterEach } from "vitest";
import Sales from "./Sales";

describe("The Sales page", () => {
  afterEach(cleanup);

  test("Sales page renders", () => {
    render(() => <Sales />);
    const newSessionButton = screen.getByRole("button", {
      name: "New session",
    });
    expect(newSessionButton).toBeDefined();
  });

  test("Clicking on the 'New session' button brings up a new sale form", async () => {
    render(() => <Sales />);
    const newSessionButton = screen.getByRole("button", {
      name: "New session",
    });
    const user = userEvent.setup();

    await user.click(newSessionButton);

    expect(screen.getByRole("form", { name: "new sale form" })).toBeDefined();
  });

  test("Can input a product and adding it shows up on the table", async () => {
    render(() => <Sales />);
    const newSessionButton = screen.getByRole("button", {
      name: "New session",
    });
    const user = userEvent.setup();

    await user.click(newSessionButton);

    const productNameInput = screen.getByTestId("product-name");
    const productQuantityInput = screen.getByTestId("product-quantity");
    const productPriceInput = screen.getByTestId("product-price");
    const addProductButton = screen.getByRole("button", { name: "Add" });

    await user.type(productNameInput, "Torch");
    await user.type(productQuantityInput, "5");
    await user.type(productPriceInput, "10");

    await user.click(addProductButton);

    const table = screen.getByRole("table");
    const productNameDisplayOnTable = screen.getByRole("cell", {
      name: "Torch",
    });
    const productQuantityDisplayOnTable = screen.getByRole("cell", {
      name: "5",
    });
    const productPriceDisplayOnTable = screen.getByRole("cell", { name: "10" });

    expect(table.children.length).toBe(2);
    expect(productNameDisplayOnTable).toHaveTextContent("Torch");
    expect(productQuantityDisplayOnTable).toHaveTextContent("5");
    expect(productPriceDisplayOnTable).toHaveTextContent("10");
  });
});
