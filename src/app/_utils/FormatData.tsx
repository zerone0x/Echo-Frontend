import moment from "moment";

export function FormatTime(time: string): string {
  const now = moment();
  const inputTime = moment(time);
  const hoursDiff = now.diff(inputTime, "hours");
  const daysDiff = now.diff(inputTime, "days");
  const minutesDiff = now.diff(inputTime, "minutes");
  if (minutesDiff < 1) {
    return "now";
  }
  if (hoursDiff < 1) {
    return `${minutesDiff}m`;
  }
  if (hoursDiff < 24) {
    return `${hoursDiff}h`;
  }
  if (daysDiff < 7) {
    return `${daysDiff}d`;
  }
  if (inputTime.year() === now.year()) {
    return inputTime.format("MMM DD");
  }

  return inputTime.format("YYYY-MM-DD");
  // 24h show hour, 7d show days, this year show month and day, other show year month day
}
