import "@testing-library/jest-dom";
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import CategoryPage from './CategoryPage';
import { userEvent } from "@testing-library/user-event";
import { faker } from '@faker-js/faker';
import { format } from "date-fns";

it("should render not found page if category is not in local storage", async () => {
  const nonExistingCategory = "non-existing-category"

  render(
    <MemoryRouter initialEntries={[`/category/${nonExistingCategory}`]}>
      <Routes>
        <Route path="/category/:categoryName" element={<CategoryPage />} />
      </Routes>
    </MemoryRouter>
  );

  expect(screen.getByText(`Category ${nonExistingCategory} Not Found`)).toBeInTheDocument()

})

test("Task creation and category page render", async () => {

    // Setup
    const categoryName = "MyCategory"
    localStorage.setItem("categories", JSON.stringify([{name: categoryName, id: 0}]))
    render(
      <MemoryRouter initialEntries={[`/category/${categoryName}`]}>
        <Routes>
          <Route path="/category/:categoryName" element={<CategoryPage />} />
        </Routes>
      </MemoryRouter>
    );
    HTMLInputElement.prototype.showPicker = jest.fn();

    // Test
    expect(screen.getByRole("heading", {level: 1})).toHaveTextContent(`${categoryName} Todos`) 

    const textInput = screen.getByRole("textbox")
    expect(textInput).toBeInTheDocument()

    const taskName = faker.lorem.word()

    await userEvent.type(textInput, taskName)

    const dateInputs = screen.getAllByTestId("date-input-label")

    await userEvent.click(dateInputs[0])

    const dateInput = screen.getByLabelText(/date/i);
    const newDate = format(new Date(), "yyyy-MM-dd")
    fireEvent.change(dateInput, { target: { value: newDate } });
  
    const addNewButton = screen.getByRole("button")  
    await userEvent.click(addNewButton);
  
    await userEvent.clear(textInput);
    expect(textInput).toHaveTextContent("");

    expect(screen.getByText(taskName)).toBeInTheDocument();

})
