import moment from "moment";

export function FormatTime(time: string): string {
  const now = moment();
  const inputTime = moment(time);
  const hoursDiff = now.diff(inputTime, "hours");
  const daysDiff = now.diff(inputTime, "days");
  if (hoursDiff < 24) {
    return `${hoursDiff} hours ago`;
  }
  if (daysDiff < 7) {
    return `${daysDiff} days ago`;
  }
  if (inputTime.year() === now.year()) {
    return inputTime.format("MMM DD");
  }

  return inputTime.format("YYYY-MM-DD");
  // 24h show hour, 7d show days, this year show month and day, other show year month day
}
