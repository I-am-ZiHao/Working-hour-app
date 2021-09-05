import { WORKING_HOUR_LIMIT } from '../constants/constants';
import Record from '../models/Record';

export const WorkingHoursSummation = (
  records: Record[],
  type: 'work' | 'over'
) => {
  let total = 0;
  records.map((record) => {
    if (type === 'work') total += record.totalWorkHours;
    else if (type === 'over') total += record.overWorkHours;
  });
  return Math.round(total * 10) / 10;
};

export const AddZero = (x: string) => {
  if (x.length < 2) return '0' + x;
  return x;
};

export const getRecordDetailAsString = (record: Record) => {
  const date = record.date;
  const year = date.getFullYear().toString();
  const month = AddZero((date.getMonth() + 1).toString());
  const day = AddZero(date.getDate().toString());
  const startWorkHour = AddZero(record.startWorkTime.getHours().toString());
  const startWorkMinute = AddZero(record.startWorkTime.getMinutes().toString());
  const endWorkHour = AddZero(record.endWorkTime.getHours().toString());
  const endWorkMinute = AddZero(record.endWorkTime.getMinutes().toString());
  const startBreakHour = AddZero(record.startBreakTime.getHours().toString());
  const startBreakMinute = AddZero(
    record.startBreakTime.getMinutes().toString()
  );
  const endBreakHour = AddZero(record.endBreakTime.getHours().toString());
  const endBreakMinute = AddZero(record.endBreakTime.getMinutes().toString());

  return {
    date,
    year,
    month,
    day,
    startWorkHour,
    startWorkMinute,
    endWorkHour,
    endWorkMinute,
    startBreakHour,
    startBreakMinute,
    endBreakHour,
    endBreakMinute,
  };
};

export const FirstDateIsOverSecondDate = (first: Date, second: Date) => {
  if (first.getTime() >= second.getTime()) return true;
  return false;
};

export const TotalHours = (first: Date, second: Date) => {
  let totalTime = second.getTime() - first.getTime();
  return totalTime / (1000 * 60 * 60);
};

export const OverHours = (totalWork: number) => {
  return totalWork > WORKING_HOUR_LIMIT ? totalWork - WORKING_HOUR_LIMIT : 0;
};

export const RoundNumber = (time: number) => {
  return Math.round(time * 100) / 100;
};
