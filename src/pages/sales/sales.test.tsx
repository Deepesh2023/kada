import { cleanup, render, screen } from "@solidjs/testing-library";
import userEvent, { UserEvent } from "@testing-library/user-event";
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
    const user = userEvent.setup();

    await sellingProductTableCreation(user);

    const table = screen.getByRole("table");
    const productNameDisplayOnTable = screen.getByRole("cell", {
      name: "Candy",
    });
    const productQuantityDisplayOnTable = screen.getByRole("cell", {
      name: "3",
    });
    const productPriceDisplayOnTable = screen.getByRole("cell", {
      name: "5",
    });
    const totalPriceDisplayOnTable = screen.getByRole("cell", { name: "95" });

    expect(table.children.length).toBe(2);
    expect(productNameDisplayOnTable).toHaveTextContent("Candy");
    expect(productQuantityDisplayOnTable).toHaveTextContent("3");
    expect(productPriceDisplayOnTable).toHaveTextContent("5");
    expect(totalPriceDisplayOnTable).toHaveTextContent("95");
  });

  test("Can delete a selling product from table", async () => {
    render(() => <Sales />);
    const user = userEvent.setup();
    await sellingProductTableCreation(user);

    let tableRows = screen.getAllByRole("row");

    expect(tableRows.length).toBe(4);

    const deleteProductButtons = screen.getAllByRole("button", {
      name: "Delete",
    });

    await user.click(deleteProductButtons[1]);
    tableRows = screen.getAllByRole("row");

    expect(tableRows.length).toBe(3);
  });
});

async function sellingProductTableCreation(user: UserEvent) {
  const newSessionButton = screen.getByRole("button", {
    name: "New session",
  });

  await user.click(newSessionButton);

  // two products-
  //     5 candies cositing 3 each
  //     4 books costing 20 each
  // total of (5 * 3) + (4 * 20) = 95

  const productNameInput = screen.getByTestId("product-name");
  const productQuantityInput = screen.getByTestId("product-quantity");
  const productPriceInput = screen.getByTestId("product-price");
  const addProductButton = screen.getByRole("button", { name: "Add" });

  await user.type(productNameInput, "Candy");
  await user.type(productQuantityInput, "5");
  await user.type(productPriceInput, "3");

  await user.click(addProductButton);

  await user.type(productNameInput, "Book");
  await user.type(productQuantityInput, "4");
  await user.type(productPriceInput, "20");

  await user.click(addProductButton);
}
