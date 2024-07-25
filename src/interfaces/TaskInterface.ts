export interface IsDoneRecord {
  date: Date,
  isDone: boolean
}

export interface TaskInterface {
  id: number;
  name: string;
  isDone: boolean | IsDoneRecord[];
  category: string;
  date: Date | null;
  monthDays?: number[];
  weekDays?: number[];
}

