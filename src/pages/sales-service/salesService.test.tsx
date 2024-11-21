import { describe, test, expect, afterEach } from "vitest";
import { screen, render, cleanup } from "@solidjs/testing-library";
import SalesService from "./SalesService";

describe("SalesService page", () => {
  afterEach(cleanup);

  test("SalesService page renders", () => {
    render(() => <SalesService />);
    const pageTitle = <h2>Sales and service</h2>;

    expect(
      screen.getByRole("heading", { name: "Sales and service" })
    ).toStrictEqual(pageTitle);
  });

  test("add new sale/service button present", () => {
    render(() => <SalesService />);
    const addNewButton = screen.getByRole("button", { name: "Add" });

    expect(addNewButton).toBeDefined();
  });
});
