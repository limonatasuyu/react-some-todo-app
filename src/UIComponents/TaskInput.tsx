import React, { ChangeEvent } from "react";
import { CustomDatePicker, MonthDayPicker, WeekDayPicker } from "./DatePickers";
import { State, Action } from "../hooks/useTasks";

interface TaskInputProps {
  state: State;
  dispatch: React.Dispatch<Action>;
  handleAddTodo: () => void;
}

const TaskInput: React.FC<TaskInputProps> = ({ state, dispatch, handleAddTodo }) => (
  <div className="flex flex-col gap-2 self-start" style={{ maxWidth: "30rem" }}>
    <input
      onChange={(event: ChangeEvent<HTMLInputElement>) =>
        dispatch({ type: "SET_INPUT_VALUE", payload: event.target.value })
      }
      value={state.inputValue}
      placeholder="New Task.."
      className="w-full bg-inherit border-none outline-none text-2xl text-slate-200"
    />
    {!state.isRegularChosen && (
      <CustomDatePicker
        handleDateChange={(event: ChangeEvent<HTMLInputElement>) =>
          dispatch({ type: "SET_TASK_DATE", payload: new Date(event.target.value) })
        }
        date={state.taskDate}
      />
    )}
    <div className="flex gap-2 items-center text-white">
      <label htmlFor="isRegular">Regular Task</label>
      <input
        name="isRegular"
        id="isRegular"
        type="checkbox"
        checked={state.isRegularChosen}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          dispatch({ type: "SET_IS_REGULAR_CHOSEN", payload: event.target.checked })
        }
      />
    </div>
    {state.isRegularChosen && (
      <>
        <MonthDayPicker
          selectedDays={state.selectedMonthDays}
          setSelectedDays={(days: number[]) => dispatch({ type: "SET_SELECTED_MONTH_DAYS", payload: days })}
        />
        <WeekDayPicker
          selectedDays={state.selectedWeekDays}
          setSelectedDays={(days: number[]) => dispatch({ type: "SET_SELECTED_WEEK_DAYS", payload: days })}
        />
      </>
    )}
    <button
      disabled={state.inputValue.length === 0}
      onClick={handleAddTodo}
      className={`text-xl flex gap-2 items-center justify-center w-36 h-8 rounded-xl shadow-lg ${
        state.inputValue.length !== 0
          ? "hover:bg-[#3EFFE2] bg-[#23CBC0] hover:shadow-xl text-white"
          : "bg-[#94cfd1] text-[#888]"
      }`}
    >
      <span>Add New</span>
      <span>
        <svg viewBox="0 0 24 24" className="w-[1.4rem]">
          <path d="M4 12H20M12 4V20" stroke="#fff" strokeWidth="2" />
        </svg>
      </span>
    </button>
  </div>
);

export default TaskInput;

