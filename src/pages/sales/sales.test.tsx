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
});
