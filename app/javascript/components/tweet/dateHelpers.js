import { format } from "prettier";

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

export const cropDate = (date) => {
  return `${date
    .toLocaleString("default", {
      month: "long",
      timeZone: "UTC",
    })
    .slice(0, 3)} ${date.getUTCDate()}`;
};
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
  `${formatHours(time)}:${formatMinutes(time)} ${isPM(time) ? "PM" : "AM"}`;

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

export const inRange = (val, min, max) =>
  /^\d+$/.test(val) && val >= min && val <= max;

export const swapMeridiem = (time) => {
  let newTime = time;
  const hours = time.getUTCHours();
  newTime.setUTCHours(hours < 11 ? hours + 12 : hours - 12);
  return newTime;
};

export const setUTCUnits = (date, timeUnits = {}, dateIsPM = null) => {
  const isTimePM = !dateIsPM ? isPM(date) : dateIsPM;
  const units = {
    seconds: date.getUTCSeconds(),
    minutes: date.getUTCMinutes(),
    hours: date.getUTCHours(),
    ...timeUnits,
  };
  if (units.hours > 12) {
    units.hours -= 12;
  }
  let newDate = date;
  inRange(units.minutes, 0, 60) && newDate.setUTCMinutes(units.minutes);
  inRange(units.seconds, 0, 60) && newDate.setUTCSeconds(units.seconds);

  if (!isTimePM && units.hours == 12) {
    newDate.setUTCHours(0);
  } else if (inRange(units.hours, 1, 12)) {
    newDate.setUTCHours(units.hours);
  }
  const hours = newDate.getUTCHours();
  if ((hours < 11 && isTimePM) || (hours > 12 && !isTimePM)) {
    newDate = swapMeridiem(newDate);
  }

  return [
    newDate,
    { minutes: newDate.getUTCMinutes(), hours: newDate.getUTCHours() },
  ];
};

export const setByDateUnit = (date, unit, i) => {
  let newDate = date;
  if (unit == "day") {
    newDate.setUTCDate(i);
  } else if (unit == "month") {
    newDate.setUTCMonth(i);
  } else if (unit == "year") {
    newDate.setUTCFullYear(prevDate.getUTCFullYear() + i);
  }
  return newDate;
};

export const relativeTime = (time, formatStringFunction = null) => {
  const formatString =
    formatStringFunction ||
    ((units, timePast) => `${timePast} ${units}${units ? " ago" : ""}`);
  let getTime = {
    hours: () => time.getUTCHours(),
    minutes: () => time.getUTCMinutes(),
    seconds: () => time.getUTCSeconds(),
  };
  for (const [units, func] of Object.entries(getTime)) {
    let timePast = func();
    if (timePast > 0) {
      return formatString(units, timePast);
    }
  }
};
