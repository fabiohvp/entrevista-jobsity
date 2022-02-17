export const TIME_OPTIONS = {
  timeStyle: "short",
  hour12: false,
} as Intl.DateTimeFormatOptions;

export function formatTime(date: Date) {
  const time = date.toLocaleTimeString("en-us", TIME_OPTIONS);
  if (time === "24:00") return "00:00";
  return time;
}

export function formatMonthTitle(date: Date) {
  const title = `${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${date.getFullYear()}`;
  return title;
}

export function getDaysInMonth(month: number, year: number) {
  return new Date(year, month + 1, 0).getDate();
}

export function getFirstDay(date: Date) {
  const firstDay = new Date(date);
  firstDay.setDate(1);
  return getDayIndex(firstDay.getDay());
}

export function getLastDay(date: Date) {
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return getDayIndex(lastDay.getDay());
}

export function getDayIndex(day: number) {
  if (day === 7) return 0;
  return day;
}
