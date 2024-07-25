import { useRef } from "react";
import { format } from "date-fns";

export const MonthDayPicker = ({
  selectedDays,
  setSelectedDays,
}: {
  selectedDays: number[];
  setSelectedDays: any;
}) => {
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);
  const toggleDay = (day: number) => {
    setSelectedDays(
      selectedDays.includes(day)
        ? selectedDays.filter((d: number) => d !== day)
        : [...selectedDays, day]
    );
  };
  return (
    <div className="p-4">
      <span className="text-white text-lg">Month Days</span>
      <div className="flex flex-wrap gap-2 mt-2">
        {daysInMonth.map((day) => (
          <div
            key={day}
            onClick={() => toggleDay(day)}
            className={`select-none w-10 h-10 flex items-center justify-center cursor-pointer border rounded 
              ${
                selectedDays.includes(day)
                  ? "bg-blue-500 text-white"
                  : "bg-white text-black"
              }`}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

export const WeekDayPicker = ({
  selectedDays,
  setSelectedDays,
}: {
  selectedDays: number[];
  setSelectedDays: any;
}) => {
  const daysInWeek = Array.from({ length: 7 }, (_, i) => i + 1);
  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const toggleDay = (day: number) => {
    setSelectedDays(selectedDays.includes(day)
        ? selectedDays.filter((d: number) => d !== day)
        : [...selectedDays, day]
    );
  };

  return (
    <div className="p-4">
      <span className="text-white text-lg">Week Days</span>
      <div className="flex flex-wrap gap-2 mt-2">
        {daysInWeek.map((day) => (
          <div
            key={day}
            onClick={() => toggleDay(day)}
            className={`select-none w-24 h-10 flex items-center justify-center cursor-pointer border rounded 
              ${
                selectedDays.includes(day)
                  ? "bg-blue-500 text-white"
                  : "bg-white text-black"
              }`}
          >
            {weekDays[day - 1]}
          </div>
        ))}
      </div>
    </div>
  );
};

export function CustomDatePicker({
  handleDateChange,
  date,
  placeHolderText,
  inputClassName,
}: {
  handleDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  date: Date | null;
  placeHolderText?: string;
  inputClassName?: string;
}) {
  const dateInputRef = useRef<HTMLInputElement>(null);

  const openDatePicker = () => {
    dateInputRef?.current?.showPicker();
  };

  return (
    <>
      <label htmlFor="date" data-testid="date-input-label" onClick={openDatePicker}>
        <div className="flex items-center justify-start gap-2 text-white cursor-pointer">
          <svg viewBox="0 0 24 24" fill="none" className="w-10">
            <path
              d="M20 10V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3m16 0v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-9m16 0H4m4-7v4m8-4v4"
              stroke="#9ca3af"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <rect x="6" y="12" width="3" height="3" rx=".5" fill="#9ca3af" />
            <rect x="10.5" y="12" width="3" height="3" rx=".5" fill="#9ca3af" />
            <rect x="15" y="12" width="3" height="3" rx=".5" fill="#9ca3af" />
          </svg>
          {date && (
            <span className="select-none">{format(date, "dd/MM/yyyy")}</span>
          )}
          {date === null && placeHolderText && (
            <span className="text-nowrap">{placeHolderText}</span>
          )}
        </div>
      </label>
      <input
        ref={dateInputRef}
        type="date"
        id="date"
        name="date"
        value={
          date ? format(date, "yyyy-MM-dd") : format(new Date(), "yyyy-MM-dd")
        }
        onChange={handleDateChange}
        className={`opacity-0 relative -mt-7 ${inputClassName ?? ""}`}
        style={{ zIndex: -1 }}
      />
    </>
  );
}
