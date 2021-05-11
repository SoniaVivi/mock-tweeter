export const daysInMonth = (date) => {
  let days = [];
  for (
    let i = 0;
    i < new Date(date.getFullYear(), date.getUTCMonth() + 1, 0).getDate();
    i += 1
  ) {
    days.push(i + 1);
  }
  return days;
};
export const formatDate = (date) =>
  `${date.toLocaleString("default", {
    month: "long",
    timeZone: "UTC",
  })} ${date.getUTCDate()}, ${date.getFullYear()}`;
export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const formatTime = (time) =>
  `${formatHours(time)}:${formatMinutes(time)}${isPM(time) ? "PM" : "AM"}`;

export const formatHours = (time) => {
  let hours = time.getUTCHours();
  return hours == 0 ? 12 : hours > 12 ? hours - 12 : hours;
};
export const formatMinutes = (time) => {
  let minutes = time.getUTCMinutes();
  return minutes > 9 ? minutes : `0${minutes}`;
};

export const isPM = (time) => {
  const hours = time.getUTCHours();
  return hours > 11 && hours != 24;
};
