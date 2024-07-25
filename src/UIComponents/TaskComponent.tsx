import { TaskInterface, IsDoneRecord } from "../interfaces/TaskInterface";
import { useEffect } from "react";

export function TaskComponent({
  task,
  onDelete,
  markTask,
  date,
  addIsDoneRecord,
}: {
  task: TaskInterface;
  onDelete: (taskId: number) => void;
  markTask: (date: Date | null) => void;
  date: Date;
  addIsDoneRecord: (date: Date) => void;
}) {
  useEffect(() => {
    if (!task.monthDays?.length && !task.weekDays?.length) return;
    const isDoneRecordExists = (task.isDone as IsDoneRecord[]).find(
      (IsDoneRecord) =>
        new Date(IsDoneRecord.date).toISOString() === date.toISOString()
    );
    if (isDoneRecordExists) return;
    addIsDoneRecord(date);
  }, [addIsDoneRecord, date, task.monthDays, task.weekDays, task.isDone]);

  return (
    <div
      className="rounded-3xl bg-[#bcd0d1] grid items-center"
      style={{ gridAutoFlow: "column" }}
    >
      <svg
        viewBox="0 0 0 0"
        className="absolute opacity-0"
        style={{ zIndex: -1 }}
      >
        <defs>
          <linearGradient
            id="boxGradient"
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1="0"
            x2="25"
            y2="25"
          >
            <stop offset="0%" stopColor="#27FDC7" />
            <stop offset="100%" stopColor="#0FC0F5" />
          </linearGradient>

          <linearGradient id="lineGradient">
            <stop offset="0%" stopColor="#0FC0F5" />
            <stop offset="100%" stopColor="#27FDC7" />
          </linearGradient>

          <path
            id="todo__line"
            stroke="url(#lineGradient)"
            d="M21 12.3h168v0.1z"
          ></path>
          <path
            id="todo__box"
            stroke="url(#boxGradient)"
            d="M21 12.7v5c0 1.3-1 2.3-2.3 2.3H8.3C7 20 6 19 6 17.7V7.3C6 6 7 5 8.3 5h10.4C20 5 21 6 21 7.3v5.4"
          ></path>
          <path
            id="todo__check"
            stroke="url(#boxGradient)"
            d="M10 13l2 2 5-5"
          ></path>
          <circle id="todo__circle" cx="13.5" cy="12.5" r="10"></circle>
        </defs>
      </svg>

      <div className="todo-list">
        <label className="todo">
          <input
            className="todo__state"
            type="checkbox"
            onChange={(event: any) => {
              markTask(typeof task.isDone === "boolean" ? null : date);
            }}
            checked={Boolean(
              typeof task.isDone === "boolean"
                ? task.isDone
                : (task.isDone as IsDoneRecord[]).find(
                    (i: IsDoneRecord) =>
                      new Date(i.date).toISOString() === date.toISOString()
                  )?.isDone
            )}
          />

          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 200 25"
            className="todo__icon !mt-[1.4rem]"
          >
            <use xlinkHref="#todo__line" className="todo__line"></use>
            <use xlinkHref="#todo__box" className="todo__box"></use>
            <use xlinkHref="#todo__check" className="todo__check"></use>
            <use xlinkHref="#todo__circle" className="todo__circle"></use>
          </svg>

          <div className="todo__text flex justify-between">{task.name}</div>
        </label>
      </div>

      <span
        className="flex justify-end mr-8 cursor-pointer"
        onClick={() => onDelete(task.id)}
      >
        <svg viewBox="0 0 256 256" width="30" height="30">
          <path
            d="M13 3a1 1 0 0 0-1.014 1H6a1 1 0 1 0 0 2h18a1 1 0 1 0 0-2h-5.986A1 1 0 0 0 17 3zM6 8v16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8z"
            transform="scale(8.53333)"
            fill="#9ca3af"
          />
        </svg>
      </span>
    </div>
  );
}
