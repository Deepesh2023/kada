import { test, expect, describe } from "vitest";
import { render } from "@solidjs/testing-library";
import userEvent from "@testing-library/user-event";

import Sales from "./Sales";

const user = userEvent.setup();

describe("The Sales page", () => {
  test("The Sales page renders", () => {
    const { getByRole } = render(() => <Sales />);

    getByRole("heading", { name: "Sales" });
  });

  test("Clicking on the 'New session' button brings up a new sale form", async () => {
    const { getByRole, getByTestId } = render(() => <Sales />);

    const newSessionButton = getByRole("button", {
      name: "New session",
    });

    await userEvent.click(newSessionButton);
    getByTestId("new-sale-form");
  });

  test("Can input values into the fields and clicking on the 'Add' button adds a new selling product", async () => {
    const { getByRole, getByTestId } = render(() => <Sales />);

    const newSessionButton = getByRole("button", {
      name: "New session",
    });

    await userEvent.click(newSessionButton);

    const sellingProductNameInput = getByTestId("product-name-input");
    const sellingProductPriceInput = getByTestId("product-price-input");
    const sellingProductQuantityInput = getByTestId("product-quantity-input");

    await user.type(sellingProductNameInput, "book");
    await user.type(sellingProductPriceInput, "20");
    await user.type(sellingProductQuantityInput, "2");

    const addButton = getByRole("button", { name: "Add" });
    await user.click(addButton);

    const sellingProductOnTable = getByTestId("selling-product-row");

    expect(sellingProductOnTable).toBeVisible();
  });

  test("Can add multiple products", async () => {
    const { getByRole, getByTestId, getAllByRole } = render(() => <Sales />);

    // two products-
    //     5 candies cositing 3 each
    //     4 books costing 20 each
    // total of (5 * 3) + (4 * 20) = 95

    const productNameInput = getByTestId("product-name-input");
    const productQuantityInput = getByTestId("product-quantity-input");
    const productPriceInput = getByTestId("product-price-input");
    const addProductButton = getByRole("button", { name: "Add" });

    await user.type(productNameInput, "Candy");
    await user.type(productQuantityInput, "5");
    await user.type(productPriceInput, "3");

    await user.click(addProductButton);

    await user.type(productNameInput, "Book");
    await user.type(productQuantityInput, "4");
    await user.type(productPriceInput, "20");

    await user.click(addProductButton);

    const sellingProductsRowOnTable = getAllByRole("row");

    expect(sellingProductsRowOnTable.length).toBe(5);
  });

  test("Can edit a selling product", async () => {
    const { getAllByRole, getByTestId } = render(() => <Sales />);

    const productNameInput = getByTestId("product-name-input");
    const productQuantityInput = getByTestId("product-quantity-input");
    const productPriceInput = getByTestId("product-price-input");

    const editButtons = getAllByRole("button", { name: "Edit" });

    // 2 books costing 20 each
    // editing the first selling product
    await user.click(editButtons[0]);

    const tableRows = getAllByRole("row");

    expect(productNameInput).toHaveValue("book");
    expect(productPriceInput).toHaveValue(20);
    expect(productQuantityInput).toHaveValue(2);
    expect(tableRows.length).toBe(4);
  });

  test("Can delete a selling product", async () => {
    const { getAllByRole } = render(() => <Sales />);

    const deleteButtons = getAllByRole("button", { name: "Delete" });

    // deletes the first one
    await user.click(deleteButtons[0]);

    const tableRows = getAllByRole("row");

    expect(tableRows.length).toBe(3);
  });
});
