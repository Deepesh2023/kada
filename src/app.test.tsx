import { cleanup, render, screen } from "@solidjs/testing-library";
import { describe, test, expect, beforeEach } from "vitest";

import App from "./App";

describe("Kada app", () => {
  beforeEach(() => {
    cleanup();
  });

  test("Renders the app", () => {
    const app = render(() => <App />);
    expect(app).toBeTruthy();
  });

  test("The app lands on the sales-servie page by default", () => {
    const heading = <h2>New sales/service</h2>;
    render(() => <App />);
    expect(screen.getByText("New sales/service")).toStrictEqual(heading);
  });
});
