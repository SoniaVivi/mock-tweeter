import React, { useState } from "react";
import CalenderDay from "./CalenderDay";
import Arrow from "../../svgs/Arrow";
import { daysInMonth, months } from "../helpers/dateHelpers";

const CalenderMenu = (props) => {
  const modifyDate = props.modifyDate;

  return (
    <React.Fragment>
      <div className="calender-body">
        <div className="calender-months container">
          {months.map((month, i) => (
            <button
              className={`calender-month${
                props.date.getUTCMonth() == i ? " selected" : ""
              }`}
              onClick={() => modifyDate(i, "month")}
            >
              {month}
            </button>
          ))}
        </div>
        <div className="calender-days container">
          {daysInMonth(props.date).map((i) => (
            <CalenderDay
              onClick={() => modifyDate(i, "day")}
              date={i}
              selected={props.date.getUTCDate() == i}
            />
          ))}
        </div>
      </div>
      <div className="calender-year container">
        <Arrow type="left" onClick={() => modifyDate(-1, "year")} />
        <span className="calender-year">{props.date.getUTCFullYear()}</span>
        <Arrow type="right" onClick={() => modifyDate(1, "year")} />
      </div>
    </React.Fragment>
  );
};

export default CalenderMenu;
