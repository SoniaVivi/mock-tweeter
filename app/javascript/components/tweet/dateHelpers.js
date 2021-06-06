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
    minutes: date.getUTCMinutes(),
    hours: date.getUTCHours(),
    ...timeUnits,
  };
  let newDate = date;
  inRange(units.minutes, 0, 60) && newDate.setUTCMinutes(units.minutes);

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
