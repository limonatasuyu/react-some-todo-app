import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "./Loader";

export default function HomePage() {
  const [categories, setCategories] = useState([
    { name: "Work", id: 0 },
    { name: "Health", id: 1 },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isCategoriesSet, setIsCategoriesSet] = useState(false);
  
  useEffect(() => {
    const retrievedCategories = localStorage.getItem("categories");
    if (!retrievedCategories) return;
    setCategories(JSON.parse(retrievedCategories));
    setIsCategoriesSet(() => true);
  }, []);

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  const handleAddCategory = () => {
    if (inputValue === "") return;
    setCategories([
      ...categories,
      {
        name: inputValue,
        id: categories.length ? categories[categories.length - 1]?.id + 1 : 0,
      },
    ]);
    setInputValue("");
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      // Call the function or perform an action when Enter is pressed
      handleAddCategory();
    }
  };

  const handleDeleteCategory = (category_id: number) => {
    const newCategories = categories.filter((i) => i.id !== category_id);
    setCategories(newCategories);
  };

  return (
    <div className="p-5 w-full justify-center min-h-screen items-center flex flex-col">
      <div className="flex flex-wrap">
        <h1 className="text-white font-bold text-3xl w-full">
          Hello, Welcome To Some Todo App
        </h1>
        <h2 className="text-white font-medium text-xl mt-2 self-start">
          Categories
        </h2>
      </div>
      <div className="flex gap-2 align-center flex-wrap mt-10 items-center justify-between sm:min-w-[36rem] w-[40rem]">
        <Link
          to={"category/all"}
          className="text-white font-medium text-2xl rounded-md bg-[#23CDD3] hover:bg-[#3EFFE2] p-10 items-center flex shadow-lg hover:shadow-xl h-20 w-full justify-center cursor-pointer"
        >
          All
        </Link>
        {!isCategoriesSet ? (
          <Loader className="w-full py-4" />
        ) : (
          categories.map((i) => (
            <CategoryLink
              category={i}
              key={i.id}
              handleDeleteCategory={handleDeleteCategory}
            />
          ))
        )}

        <div className="text-slate-300 hover:text-slate-100 font-medium text-2xl rounded-md bg-[#23CDD3] p-10 items-center flex flex-row-reverse gap-2 shadow-lg hover:shadow-xl h-20 w-[48%] justify-center cursor-pointer">
          <input
            id="new-category-input"
            onChange={(event) => setInputValue(event.target.value)}
            value={inputValue}
            className="w-full bg-inherit border-none outline-none peer"
            onKeyPress={handleKeyPress}
          /> 
          <label htmlFor="new-category-input" className="peer-focus:hidden w-full cursor-text">
            New&nbsp;Category
          </label>
          <svg
            viewBox="0 0 24 24"
            className="peer-focus:w-[1.8rem] w-[10rem]"
            onClick={handleAddCategory}
            data-testid="add-category-button"
          >
            <path d="M4 12H20M12 4V20" stroke="#9CA3AF" strokeWidth="2" />
          </svg>
        
        </div>
      </div>
    </div>
  );
}

function CategoryLink({ category, handleDeleteCategory }: any) {
  return (
    <Link
      to={`category/${category.name}`}
      className="group/item gap-2 text-white font-medium text-2xl rounded-md bg-[#23CDD3] hover:bg-[#3EFFE2] p-10 items-center flex shadow-lg hover:shadow-xl h-20 w-[48%] justify-center cursor-pointer"
   > 
      <span>{category.name}</span>
      <span
        className="invisible group-hover/item:visible"
        onClick={(event: React.MouseEvent<HTMLSpanElement>) => {
          event.stopPropagation();
          event.preventDefault();
          handleDeleteCategory(category.id);
        }}
      >
        <svg viewBox="0 0 256 256" width="30" height="30" aria-label="delete-category-button">
          <path
            d="M13 3a1 1 0 0 0-1.014 1H6a1 1 0 1 0 0 2h18a1 1 0 1 0 0-2h-5.986A1 1 0 0 0 17 3zM6 8v16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8z"
            transform="scale(8.53333)"
            fill="#9ca3af"
          />
        </svg>
      </span>
    </Link>
  );
}
