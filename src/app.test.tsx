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
});
