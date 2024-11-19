import { render } from "@solidjs/testing-library";
import { describe, test, expect } from "vitest";

import App from "./App";

describe("Kada app", () => {
  test("Renders the app", () => {
    const app = render(() => <App />);
    expect(app).toBeTruthy();
  });
});
