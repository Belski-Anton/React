import Card from "./index";
import { render, screen } from "@testing-library/react";

export const mockPerson = {
  forename: "John Doe",
  date_of_birth: "1990-01-01",
  nationalities: ["US"],
  entity_id: "123",
  _links: {},
};


describe("Card Component", () => {
  beforeEach(() => {
    render(<Card item={mockPerson} />);
  });

  it("renders correctly with all data", () => {
    expect(screen.getByText("John Doe")).toBeDefined();
    expect(screen.getByText("Date(s) of Birth Used: 1990-01-01")).toBeDefined();
    expect(screen.getByText("view more")).toBeDefined();
  });

  it("renders default photo when no thumbnail", () => {
    const img = screen.getAllByAltText("John Doe")[0];
    expect(img.getAttribute("src")).toMatch(/photo\.webp/i);
  });

  it('buttons view more is link', () => {
    const link = screen.getByText(/view more/i);
    expect(link.getAttribute("href")).toMatch("123");
  });
});
