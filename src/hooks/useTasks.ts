import { useReducer, useEffect } from "react";
import { IsDoneRecord, TaskInterface } from "../interfaces/TaskInterface";

export type State = {
  inputValue: string;
  taskDate: Date;
  isRegularChosen: boolean;
  tasks: TaskInterface[];
  selectedMonthDays: number[];
  selectedWeekDays: number[];
  tasksOnView: "today" | "tomorrow" | "yesterday" | "custom";
  taskToViewDate: Date | null;
  categoryFound: boolean | null;
};

export type Action =
  | { type: "SET_INPUT_VALUE"; payload: string }
  | { type: "SET_TASK_DATE"; payload: Date }
  | { type: "SET_IS_REGULAR_CHOSEN"; payload: boolean }
  | { type: "SET_TASKS"; payload: TaskInterface[] }
  | { type: "SET_SELECTED_MONTH_DAYS"; payload: number[] }
  | { type: "SET_SELECTED_WEEK_DAYS"; payload: number[] }
  | {
      type: "SET_TASKS_ON_VIEW";
      payload: "today" | "tomorrow" | "yesterday" | "custom";
    }
  | { type: "SET_TASK_TO_VIEW_DATE"; payload: Date | null }
  | { type: "SET_CATEGORY_FOUND"; payload: boolean }
  | { type: "ADD_TASK"; payload: TaskInterface }
  | { type: "DELETE_TASK"; payload: number }
  | { type: "MARK_TASK"; payload: { taskId: number; date: Date | null } }
  | { type: "RESET_FORM" }
  | { type: "ADD_IS_DONE_RECORD"; payload: { taskId: number; date: Date } };

const initialState: State = {
  inputValue: "",
  taskDate: new Date(),
  isRegularChosen: false,
  tasks: [],
  selectedMonthDays: [],
  selectedWeekDays: [],
  tasksOnView: "today",
  taskToViewDate: null,
  categoryFound: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_INPUT_VALUE":
      return { ...state, inputValue: action.payload };
    case "SET_TASK_DATE":
      return { ...state, taskDate: action.payload };
    case "SET_IS_REGULAR_CHOSEN":
      return { ...state, isRegularChosen: action.payload };
    case "SET_TASKS":
      return { ...state, tasks: action.payload };
    case "SET_SELECTED_MONTH_DAYS":
      return { ...state, selectedMonthDays: action.payload };
    case "SET_SELECTED_WEEK_DAYS":
      return { ...state, selectedWeekDays: action.payload };
    case "SET_TASKS_ON_VIEW":
      return { ...state, tasksOnView: action.payload };
    case "SET_TASK_TO_VIEW_DATE":
      return { ...state, taskToViewDate: action.payload };
    case "SET_CATEGORY_FOUND":
      return { ...state, categoryFound: action.payload };
    case "ADD_TASK":
      return { ...state, tasks: [...state.tasks, action.payload] };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case "MARK_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id === action.payload.taskId) {
            if (typeof task.isDone === "boolean") {
              return { ...task, isDone: !task.isDone };
            }

            const updatedIsDone = task.isDone.map((i) => {
              const payloadDate = new Date(action.payload.date);
              payloadDate.setHours(0, 0, 0, 0);
              if (new Date(i.date).toISOString() === payloadDate.toISOString()) {
                return { ...i, isDone: !i.isDone };
              }
              return i;
            });

            return { ...task, isDone: updatedIsDone };
          }

          return task;
        }),
      };
    case "ADD_IS_DONE_RECORD":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.taskId
            ? {
                ...task,
                isDone: [
                  ...(task.isDone as IsDoneRecord[]),
                  { date: action.payload.date, isDone: false },
                ],
              }
            : task
        ),
      };
    case "RESET_FORM":
      return {
        ...state,
        inputValue: "",
        isRegularChosen: false,
        selectedWeekDays: [],
        selectedMonthDays: [],
      };
    default:
      return state;
  }
}

export function useTasks(categoryName: string) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(state.tasks));

    const retrievedCategories = localStorage.getItem("categories");
    if (!retrievedCategories)
      localStorage.setItem("categories", JSON.stringify([]));
  }, [state.tasks]);

  useEffect(() => {
    const retrievedTasks = localStorage.getItem("tasks");
    const retrievedCategories = localStorage.getItem("categories");
    if (!retrievedTasks || !retrievedCategories) return;
    dispatch({ type: "SET_TASKS", payload: JSON.parse(retrievedTasks) });

    if (categoryName === "all") {
      dispatch({ type: "SET_CATEGORY_FOUND", payload: true });
      return;
    }

    const categories = JSON.parse(retrievedCategories);
    dispatch({
      type: "SET_CATEGORY_FOUND",
      payload: categories.some(
        (i: { name: string }) => i.name === categoryName
      ),
    });
  }, [categoryName]);

  return { state, dispatch };
}
