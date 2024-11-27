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
});
