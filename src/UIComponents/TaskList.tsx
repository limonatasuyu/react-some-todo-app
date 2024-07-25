import React from "react";
import { TaskComponent } from "./TaskComponent";
import { CustomDatePicker } from "./DatePickers";
import { State, Action } from "../hooks/useTasks";

const datesAreEqual = (date1: Date | null, date2: Date | null): boolean => {
  if (!date1 || !date2) return false;
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

interface TaskListProps {
  state: State;
  dispatch: React.Dispatch<Action>;
  category: string;
}

const TaskList: React.FC<TaskListProps> = ({ state, dispatch, category }) => {
  const currentDate = new Date();

  const getDateBasedOnView = () => {
    if (state.tasksOnView === "today") {
      return currentDate;
    } else if (state.tasksOnView === "tomorrow") {
      const tomorrow = new Date(currentDate);
      tomorrow.setDate(currentDate.getDate() + 1);
      return tomorrow;
    } else if (state.tasksOnView === "yesterday") {
      const yesterday = new Date(currentDate);
      yesterday.setDate(currentDate.getDate() - 1);
      return yesterday;
    } else {
      return state.taskToViewDate;
    }
  };

  const date = getDateBasedOnView();

  const filteredTasks = state.tasks
    .filter((task) => {
      return (
        (task.monthDays?.includes((date as Date).getDate()) ||
          task.weekDays?.includes((date as Date).getDay() + 1) ||
          (task.date && datesAreEqual(date, new Date(task.date)))) &&
        (category === "all" || task.category === category)
      );
    })

  return (
    <div>
      <div className="flex gap-2 bg-[#94cfd1] p-2 rounded-xl">
        {["yesterday", "today", "tomorrow"].map((view) => (
          <div
            key={view}
            className={`flex items-center text-white rounded-2xl p-2 font-bold cursor-pointer bg-[${
              state.tasksOnView === view ? "#3EFFE2" : "#23CDD3"
            }]`}
            onClick={() => {
              dispatch({
                type: "SET_TASKS_ON_VIEW",
                payload: view as "today" | "tomorrow" | "yesterday",
              });
              dispatch({ type: "SET_TASK_TO_VIEW_DATE", payload: null });
            }}
          >
            {view.charAt(0).toUpperCase() + view.slice(1)}
          </div>
        ))}
        <div
          className={`w-48 flex text-white rounded-2xl p-2 font-bold cursor-pointer bg-[${
            state.tasksOnView === "custom" ? "#3EFFE2" : "#23CDD3"
          }]`}
        >
          <CustomDatePicker
            handleDateChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              dispatch({
                type: "SET_TASK_TO_VIEW_DATE",
                payload: new Date(event.target.value),
              });
              dispatch({ type: "SET_TASKS_ON_VIEW", payload: "custom" });
            }}
            date={state.taskToViewDate}
            placeHolderText="Choose Date"
            inputClassName="ml-[-9.3rem]"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-2">
        {filteredTasks.map((task) => (
          <TaskComponent
            key={task.id}
            task={task}
            markTask={(date) => dispatch({ type: "MARK_TASK", payload: {taskId: task.id, date: date} })}
            onDelete={() => dispatch({ type: "DELETE_TASK", payload: task.id })}
            date={date as Date}
            addIsDoneRecord={(date) => dispatch({type: "ADD_IS_DONE_RECORD", payload: {taskId: task.id, date: date}})}
          />
        ))}
      </div>
    </div>
  );
};
export default TaskList;
