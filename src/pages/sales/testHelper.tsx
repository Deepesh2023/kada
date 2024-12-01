import { screen } from "@solidjs/testing-library";
import { UserEvent } from "@testing-library/user-event";

export async function createSellingProductTable(user: UserEvent) {
  const newSessionButton = screen.getByRole("button", { name: "New session" });

  await user.click(newSessionButton);

  // two products-
  //     5 candies cositing 3 each
  //     4 books costing 20 each
  // total of (5 * 3) + (4 * 20) = 95

  const productNameInput = screen.getByTestId("product-name-input");
  const productQuantityInput = screen.getByTestId("product-quantity-input");
  const productPriceInput = screen.getByTestId("product-price-input");
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
