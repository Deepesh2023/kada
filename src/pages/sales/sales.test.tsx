import { test, expect, describe } from "vitest";
import { render, screen } from "@solidjs/testing-library";
import Sales from "./Sales";

describe("The Sales page", () => {
  test("The Sales page renders", () => {
    const { container } = render(() => <Sales />);

    screen.getByRole("heading", { name: "Sales" });
    expect(container).toBeVisible();
  });
});
