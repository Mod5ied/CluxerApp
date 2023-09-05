import { beforeEach, describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("Fetch test", () => {
  test("Should render on initial load", () => {
    beforeEach(() => {
      render(
        <App>
          <div className="Parent"></div>
        </App>
      );
    });

    expect(screen.getByText(/Parent/i)).toHaveBeenCalled();
  });
});
