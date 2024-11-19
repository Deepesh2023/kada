import { render, screen, cleanup } from "@solidjs/testing-library";
import { describe, test, expect, beforeEach } from "vitest";

import CurrentPage from "./CurrentPage";

describe("Current page commponent", () => {
  beforeEach(() => {
    cleanup();
  });

  test("renders the component", () => {
    const currentPage = render(() => <CurrentPage />);
    expect(currentPage).toBeTruthy();
  });

  test("Have the default title 'Kada'", () => {
    render(() => <CurrentPage />);
    const title = screen.getByText("Kada").innerHTML;
    expect(title).toEqual("Kada");
  });
});
