import { cleanup, render, screen } from "@solidjs/testing-library";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, afterEach } from "vitest";

import "@testing-library/jest-dom/vitest";

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

    test("clicking on the 'History' link displays the history page", async () => {
      render(() => <App />);
      const user = userEvent.setup();
      const pageLink = screen.getByRole("link", { name: "History" });

      await user.click(pageLink);

      const pageHeading = <h2>History</h2>;
      expect(
        await screen.findByRole("heading", { name: "History" })
      ).toStrictEqual(pageHeading);
    });

    test("clicking on the 'Stats' link displays the stats page", async () => {
      render(() => <App />);
      const user = userEvent.setup();
      const pageLink = screen.getByRole("link", { name: "Stats" });

      await user.click(pageLink);

      const pageHeading = <h2>Stats</h2>;
      expect(
        await screen.findByRole("heading", { name: "Stats" })
      ).toStrictEqual(pageHeading);
    });

    test("clicking on the 'Settings' link displays the settings page", async () => {
      render(() => <App />);
      const user = userEvent.setup();
      const pageLink = screen.getByRole("link", { name: "Settings" });

      await user.click(pageLink);

      const pageHeading = <h2>Settings</h2>;
      expect(
        await screen.findByRole("heading", { name: "Settings" })
      ).toStrictEqual(pageHeading);
    });
  });
});
