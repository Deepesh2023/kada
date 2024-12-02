import { test, expect, describe } from "vitest";
import { render } from "@solidjs/testing-library";
import userEvent from "@testing-library/user-event";

import Sales from "./Sales";
import { sellingProductsTableCreation } from "./testHelper";

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

  test("Can add multiple products to the table", async () => {
    const { getByRole, getAllByRole, getByTestId } = render(() => <Sales />);

    const newSessionButton = getByRole("button", {
      name: "New session",
    });

    await user.click(newSessionButton);

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

    expect(sellingProductsRowOnTable.length).toBe(4);
  });

  test("Can edit a selling product and the editing one will be removed from the table", async () => {
    const { getAllByRole, getByTestId, getByRole } = render(() => <Sales />);

    const newSessionButton = getByRole("button", {
      name: "New session",
    });

    await user.click(newSessionButton);

    // two products-
    //     5 candies cositing 3 each
    //     4 books costing 20 each
    // total of (5 * 3) + (4 * 20) = 95

    let productNameInput = getByTestId("product-name-input");
    let productQuantityInput = getByTestId("product-quantity-input");
    let productPriceInput = getByTestId("product-price-input");
    let addProductButton = getByRole("button", { name: "Add" });

    await user.type(productNameInput, "Candy");
    await user.type(productQuantityInput, "5");
    await user.type(productPriceInput, "3");

    await user.click(addProductButton);

    await user.type(productNameInput, "Book");
    await user.type(productQuantityInput, "4");
    await user.type(productPriceInput, "20");

    await user.click(addProductButton);

    const editButtons = getAllByRole("button", { name: "Edit" });

    // editing the first selling product
    await user.click(editButtons[0]);

    productNameInput = getByTestId("product-name-input");
    productQuantityInput = getByTestId("product-quantity-input");
    productPriceInput = getByTestId("product-price-input");

    const tableRows = getAllByRole("row");

    expect(productNameInput).toHaveValue("Candy");
    expect(productPriceInput).toHaveValue(3);
    expect(productQuantityInput).toHaveValue(5);
    expect(tableRows.length).toBe(3);
  });

  test("Can delete a selling product", async () => {
    const { getAllByRole, getByRole, getByTestId } = render(() => <Sales />);

    const newSessionButton = getByRole("button", {
      name: "New session",
    });

    await user.click(newSessionButton);

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

    const deleteButtons = getAllByRole("button", { name: "Delete" });

    // deletes the first one
    await user.click(deleteButtons[0]);

    const tableRows = getAllByRole("row");

    expect(tableRows.length).toBe(3);
  });
});
