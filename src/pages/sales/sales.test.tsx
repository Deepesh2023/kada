import { render, screen } from "@solidjs/testing-library";
import { userEvent } from "@testing-library/user-event";
import { describe, test, expect } from "vitest";

import { createSellingProductTable } from "./testHelper";

import Sales from "./Sales";

describe("The Sales page", () => {
  test("Sales page renders", () => {
    render(() => <Sales />);

    screen.getByRole("button", {
      name: "New session",
    });
  });

  test("Clicking on the 'New session' button brings up a new sale form", async () => {
    render(() => <Sales />);

    const newSessionButton = screen.getByRole("button", {
      name: "New session",
    });
    const user = userEvent.setup();

    await user.click(newSessionButton);

    screen.getByRole("form", { name: "new sale form" });
  });

  test("Can input a product and adding it shows up on the table", async () => {
    render(() => <Sales />);
    const user = userEvent.setup();

    await createSellingProductTable(user);

    const tableRows = screen.getAllByRole("row");

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

    expect(tableRows.length).toBe(4);
    expect(productNameDisplayOnTable).toHaveTextContent("Candy");
    expect(productQuantityDisplayOnTable).toHaveTextContent("3");
    expect(productPriceDisplayOnTable).toHaveTextContent("5");
    expect(totalPriceDisplayOnTable).toHaveTextContent("95");
  });

  test("Can delete a selling product from table", async () => {
    render(() => <Sales />);
    const user = userEvent.setup();
    await createSellingProductTable(user);

    let tableRows = screen.getAllByRole("row");

    expect(tableRows.length).toBe(4);

    const deleteProductButtons = screen.getAllByRole("button", {
      name: "Delete",
    });

    await user.click(deleteProductButtons[1]);
    tableRows = screen.getAllByRole("row");

    expect(tableRows.length).toBe(3);
  });

  test("Can edit a selling product", async () => {
    render(() => <Sales />);
    const user = userEvent.setup();

    await createSellingProductTable(user);

    let tableRows = screen.getAllByRole("row");

    expect(tableRows.length).toBe(4);

    const editSellingProductButtons = screen.getAllByRole("button", {
      name: "Edit",
    });

    await user.click(editSellingProductButtons[1]);

    const productNameInput = screen.getByDisplayValue("Book");
    const productQuantityInput = screen.getByDisplayValue("4");
    const productPriceInput = screen.getByDisplayValue("20");

    tableRows = screen.getAllByRole("row");

    expect(tableRows.length).toBe(3);
    expect(productNameInput.id).toEqual("product-name");
    expect(productQuantityInput.id).toEqual("product-quantity");
    expect(productPriceInput.id).toEqual("product-price");
  });

  test("Cannot add a empty entry to the table", async () => {
    render(() => <Sales />);
    const user = userEvent.setup();

    const newSessionButton = screen.getByRole("button", {
      name: "New session",
    });

    await user.click(newSessionButton);

    let tableRows = screen.getAllByRole("row");
    expect(tableRows.length).toBe(2);

    const addNewSellingProductButton = screen.getByRole("button", {
      name: "Add",
    });

    await user.click(addNewSellingProductButton);
    tableRows = screen.getAllByRole("row");

    expect(tableRows.length).toBe(2);
  });
});
