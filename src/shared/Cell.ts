import { getDaysInMonth, getFirstDay, getLastDay } from "./Date";

export function addRemindersToCells(cells: ICell[], reminders: IReminder[]) {
  for (let i = 0; i < cells.length; i++) {
    cells[i].reminders = reminders.filter((o) => {
      return (
        cells[i].date.getTime() -
          new Date(
            o.date.getFullYear(),
            o.date.getMonth(),
            o.date.getDate()
          ).getTime() ===
        0
      );
    });
    cells[i].reminders.sort((a, b) => a.date.getTime() - b.date.getTime());
  }
  return cells;
}

export function generatePreviousDates(date: Date) {
  const cells: ICell[] = [];
  let firstDay = getFirstDay(date);
  let previousDayCounter = -firstDay;

  while (previousDayCounter < 0) {
    const previousDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      previousDayCounter + 1
    );
    cells.push({ date: previousDate, disabled: true, reminders: [] });
    previousDayCounter++;
  }
  return cells;
}

export function generateCurrentDates(date: Date) {
  const cells: ICell[] = [];
  const totalDays = getDaysInMonth(date.getMonth(), date.getFullYear());

  for (let i = 0; i < totalDays; i++) {
    const copyDate = new Date(date.getFullYear(), date.getMonth(), i + 1);
    cells.push({ date: copyDate, disabled: false, reminders: [] });
  }
  return cells;
}

export function generateNextDates(date: Date) {
  const cells: ICell[] = [];
  let lastDay = getLastDay(date);
  let nextDayCounter = lastDay + 1;

  while (nextDayCounter < 7) {
    const nextDate = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      nextDayCounter - lastDay
    );
    cells.push({ date: nextDate, disabled: true, reminders: [] });
    nextDayCounter++;
  }
  return cells;
}
