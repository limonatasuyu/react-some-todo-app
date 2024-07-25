import "@testing-library/jest-dom";
import { render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import CategoryPage from "./CategoryPage";
import userEvent from "@testing-library/user-event";

function generateRandomString(length: number) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    result += characters[randomIndex];
  }
  return result;
}

const mockData = [
  { name: "Link 1", id: 0 },
  { name: "Link 2", id: 1 },
  { name: "Link 3", id: 2 },
  { name: "Link 4", id: 3 },
];

beforeEach(() => {
  localStorage.setItem("categories", JSON.stringify(mockData));
});

afterEach(() => {
  localStorage.clear();
});

it("should render the home page with the categories", () => {
  render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>
  );

  const heading = screen.getByRole("heading", { level: 1 });
  expect(heading).toHaveTextContent("Hello, Welcome To Some Todo App");

  const subHeading = screen.getByRole("heading", { level: 2 });
  expect(subHeading).toHaveTextContent("Categories");

  mockData.forEach((i) => {
    expect(screen.getByText(i.name)).toBeInTheDocument();
  });
});

describe("Category Creation Tests", () => {
  const setup = () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    const input = screen.getByLabelText("New Category") as HTMLInputElement;
    const addButton = screen.getByTestId("add-category-button");

    return { input, addButton };
  };

  it("should create a new category on enter press after typing the name", async () => {
    const { input } = setup();
    const categoryName = generateRandomString(5);
    
    await userEvent.clear(input);
    await userEvent.type(input, categoryName);
    await userEvent.keyboard("{enter}");

    expect(input).toHaveValue("");

    const newCategoryLink = screen.getByText(categoryName);
    expect(newCategoryLink).toBeInTheDocument();
  });

  it("should create a new category on button click after typing the name", async () => {
    const { input, addButton } = setup();
    const categoryName = generateRandomString(5);
   
    await userEvent.clear(input);
    await userEvent.type(input, categoryName);
    await userEvent.click(addButton);

    expect(input).toHaveValue("");

    const newCategoryLink = screen.getByText(categoryName);
    expect(newCategoryLink).toBeInTheDocument();

  });

  it("should not create any categories if the input is empty and enter is pressed", () => {
    const { input } = setup();
    const initialLinks = screen.getAllByRole("link");

    userEvent.clear(input);
    input.focus();
    userEvent.keyboard("{enter}");

    const updatedLinks = screen.getAllByRole("link");
    expect(updatedLinks.length).toBe(initialLinks.length);
  });

  it("should not create any categories if the input is empty and button is clicked", () => {
    const { input, addButton } = setup();
    const initialLinks = screen.getAllByRole("link");

    userEvent.clear(input);
    userEvent.click(addButton);

    const updatedLinks = screen.getAllByRole("link");
    expect(updatedLinks.length).toBe(initialLinks.length);
  });

  it("should navigate to the correct category page when a category link is clicked", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
        </Routes>
      </MemoryRouter>
    );

    const categoryLink = screen.getByText(mockData[0].name);
    await userEvent.click(categoryLink);
      
    const heading = screen.getByText(`${mockData[0].name} Todos`);
    expect(heading).toBeInTheDocument();

  });
});
