import { render, screen } from "@solidjs/testing-library";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, vi, afterAll } from "vitest";

import "@testing-library/jest-dom/vitest";

import App from "./App";

const user = userEvent.setup();
window.scrollTo = vi.fn();

describe("Kada app", () => {
  test("Renders the app", () => {
    const app = render(() => <App />);
    expect(app).toBeTruthy();
  });

  test("The app lands on the sales-servie page by default", async () => {
    render(() => <App />);

    expect(
      await screen.findByRole("heading", { name: "Sales and service" })
    ).toHaveTextContent("Sales and service");
  });

  describe("clicking on the navbar links", () => {
    test("clicking on the sales/service link displays the sales-service page", async () => {
      render(() => <App />);

      const pageLink = screen.getByRole("link", { name: "Sales/service" });

      await user.click(pageLink);

      expect(
        screen.getByRole("heading", { name: "Sales and service" })
      ).toHaveTextContent("Sales and service");
    });

    test("clicking on the 'manage store' link displays the manage-store page", async () => {
      render(() => <App />);
      const pageLink = screen.getByRole("link", { name: "Manage store" });

      await user.click(pageLink);

      expect(
        await screen.findByRole("heading", { name: "Manage store" })
      ).toHaveTextContent("Manage store");
    });

    test("clicking on the 'History' link displays the history page", async () => {
      render(() => <App />);

      const pageLink = screen.getByRole("link", { name: "History" });

      await user.click(pageLink);

      expect(
        await screen.findByRole("heading", { name: "History" })
      ).toHaveTextContent("History");
    });

    test("clicking on the 'Stats' link displays the stats page", async () => {
      render(() => <App />);
      const pageLink = screen.getByRole("link", { name: "Stats" });

      await user.click(pageLink);

      expect(
        await screen.findByRole("heading", { name: "Stats" })
      ).toHaveTextContent("Stats");
    });

    test("clicking on the 'Settings' link displays the settings page", async () => {
      render(() => <App />);
      const pageLink = screen.getByRole("link", { name: "Settings" });

      await user.click(pageLink);

      expect(
        await screen.findByRole("heading", { name: "Settings" })
      ).toHaveTextContent("Settings");
    });
  });

  afterAll(vi.clearAllMocks);
});
