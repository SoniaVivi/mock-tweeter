import React from "react";

const CalenderDay = (props) => {
  return (
    <button
      className={`calender-day${props.selected ? " selected" : ""}`}
      onClick={props.onClick}
    >
      {props.date}
    </button>
  );
};

export default CalenderDay;
