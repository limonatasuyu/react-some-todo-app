import React, { useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { useTasks } from "./hooks/useTasks";
import TaskInput from "./UIComponents/TaskInput";
import TaskList from "./UIComponents/TaskList";

const Page: React.FC = () => {
  const { categoryName } = useParams();
  const { state, dispatch } = useTasks(categoryName as string);

  const handleAddTodo = useCallback(() => {
    dispatch({
      type: "ADD_TASK",
      payload: {
        id: Date.now(),
        name: state.inputValue,
        isDone: state.isRegularChosen ? [] : false,
        category: categoryName as string,
        date: state.isRegularChosen ? null : state.taskDate,
        monthDays: state.selectedMonthDays,
        weekDays: state.selectedWeekDays,
      },
    });
    dispatch({ type: "RESET_FORM" });
  }, [
    state.inputValue,
    state.taskDate,
    state.isRegularChosen,
    state.selectedMonthDays,
    state.selectedWeekDays,
    categoryName,
    dispatch,
  ]);

  if (state.categoryFound === null)
    return (
      <div className="w-screen h-screen flex flex-col justify-center items-center gap-2">
        <h1 className="text-white text-3xl capitalize font-bold">Loading..</h1>
      </div>
    );

  if (!state.categoryFound)
    return (
      <div className="w-screen h-screen flex flex-col justify-center items-center gap-2">
        <h1 className="text-white text-3xl capitalize font-bold">
          Category {categoryName} Not Found
        </h1>
        <Link className="text-slate-100 text-2xl hover:text-slate-300" to="/">
          Go Back To Home Page
        </Link>
      </div>
    );

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <div className="p-5 w-auto justify-center items-center flex flex-col gap-4">
        <h1 className="text-white text-3xl capitalize font-bold self-start">
          {categoryName} Todos
        </h1>
        <TaskInput
          state={state}
          dispatch={dispatch}
          handleAddTodo={handleAddTodo}
        />
        <TaskList
          state={state}
          dispatch={dispatch}
          category={categoryName as string}
        />
      </div>
    </div>
  );
};

export default Page;
