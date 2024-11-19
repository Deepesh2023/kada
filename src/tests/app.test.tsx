import { render } from "@solidjs/testing-library";
import { describe, test, expect } from "vitest";

import App from "../App";

const app = render(() => <App />);

describe("Kada app", () => {
  test("Renders the app", () => {
    expect(app).toBeTruthy();
  });

  test("Renders the default name of the app as 'Kada' as title", async () => {});
});
