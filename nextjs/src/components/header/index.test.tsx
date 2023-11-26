import { render, screen } from "@testing-library/react";
import Header from "./index";
import "@testing-library/jest-dom";

describe("Header", () => {
  it("renders a heading", () => {
    render(<Header />);
    const textElement = screen.getByText(
      "View and search public Red Notices for wanted persons"
    );
    expect(textElement).toBeInTheDocument();
  });
});
