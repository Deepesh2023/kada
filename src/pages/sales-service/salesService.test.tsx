import { describe, test, expect, afterEach } from "vitest";
import { screen, render, cleanup } from "@solidjs/testing-library";
import SalesService from "./SalesService";
import userEvent from "@testing-library/user-event";

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

  test("clicking on the 'add' button brings up two addtional buttons- 'Sale' and 'Service'", async () => {
    render(() => <SalesService />);
    const addButton = screen.getByRole("button", { name: "Add" });

    await userEvent.click(addButton);

    const saleButton = screen.getByRole("button", { name: "Sale" });
    const serviceButton = screen.getByRole("button", { name: "Service" });
    const closeButton = screen.getByRole("button", { name: "Close" });

    expect(saleButton).toBeDefined();
    expect(serviceButton).toBeDefined();
    expect(closeButton).toBeDefined();
  });
});
