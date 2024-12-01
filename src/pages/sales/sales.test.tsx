import { test, expect, describe } from "vitest";
import { render, screen } from "@solidjs/testing-library";
import userEvent from "@testing-library/user-event";

import Sales from "./Sales";

const user = userEvent.setup();

describe("The Sales page", () => {
  test("The Sales page renders", () => {
    const { container } = render(() => <Sales />);

    screen.getByRole("heading", { name: "Sales" });
    expect(container).toBeVisible();
  });

  test("Clicking on the 'New session' button brings up a new sale form", async () => {
    render(() => <Sales />);

    const newSessionButton = screen.getByRole("button", {
      name: "New session",
    });

    await userEvent.click(newSessionButton);
    screen.getByTestId("new-sale-form");
  });

  test("Can input values into the fields and clicking on the 'Add' button adds a new selling product", async () => {
    render(() => <Sales />);

    const newSessionButton = screen.getByRole("button", {
      name: "New session",
    });

    await userEvent.click(newSessionButton);

    const sellingProductNameInput = screen.getByTestId("product-name-input");
    const sellingProductPriceInput = screen.getByTestId("product-price-input");
    const sellingProductQuantityInput = screen.getByTestId(
      "product-quantity-input"
    );

    await user.type(sellingProductNameInput, "book");
    await user.type(sellingProductPriceInput, "20");
    await user.type(sellingProductQuantityInput, "2");

    const addButton = screen.getByRole("button", { name: "Add" });
    await user.click(addButton);

    const sellingProductOnTable = screen.getByTestId("selling-product-row");

    expect(sellingProductOnTable).toBeVisible();
  });
});
