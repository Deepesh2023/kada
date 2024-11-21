import { cleanup, render, screen } from "@solidjs/testing-library";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, beforeEach, afterEach } from "vitest";

import App from "./App";

describe("Kada app", () => {
  afterEach(cleanup);

  test("Renders the app", () => {
    const app = render(() => <App />);
    expect(app).toBeTruthy();
  });

  test("The app lands on the sales-servie page by default", () => {
    const heading = <h2>Sales and service</h2>;
    render(() => <App />);
    expect(
      screen.getByRole("heading", { name: "Sales and service" })
    ).toStrictEqual(heading);
  });

  describe("clicking on the navbar links", () => {
    afterEach(cleanup);

    test("clicking on the sales/service link displays the sales-service page", async () => {
      render(() => <App />);
      const pageLink = screen.getByRole("link", { name: "Sales/service" });
      const user = userEvent.setup();

      await user.click(pageLink);
      const pageHeading = <h2>Sales and service</h2>;

      expect(
        screen.getByRole("heading", { name: "Sales and service" })
      ).toStrictEqual(pageHeading);
    });

    test("clicking on the 'manage store' link displays the manage-store page", async () => {
      render(() => <App />);
      const user = userEvent.setup();
      const pageLink = screen.getByRole("link", { name: "Manage store" });

      await user.click(pageLink);

      const pageHeading = <h2>Manage store</h2>;
      expect(
        await screen.findByRole("heading", { name: "Manage store" })
      ).toStrictEqual(pageHeading);
    });

    test("clicking on the 'history' link displays the history page", async () => {
      render(() => <App />);
      const user = userEvent.setup();
      const pageLink = screen.getByRole("link", { name: "History" });

      await user.click(pageLink);

      const pageHeading = <h2>History</h2>;
      expect(
        await screen.findByRole("heading", { name: "History" })
      ).toStrictEqual(pageHeading);
    });

    // test("clicking on the 'stats' link displays the stats page", async () => {
    //   const pageHeading = <h1>Stats</h1>;
    //   expect(await screen.findByText("Stats")).toStrictEqual(pageHeading);
    // });

    // test("clicking on the 'settings' link displays the settings page", async () => {
    //   const pageHeading = <h1>Settings</h1>;
    //   expect(await screen.findByText("Settings")).toStrictEqual(pageHeading);
    // });
  });
});
