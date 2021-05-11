import React, { useState } from "react";
import PropTypes from "prop-types";
import CalenderDay from "./CalenderDay";
import Arrow from "../svgs/Arrow";
import { daysInMonth, months } from "./dateHelpers";

const CalenderMenu = (props) => {
  const [date, setDate] = useState(props.date);
  const modifyDate = (i, attribute) => {
    props.modifyDate(i, attribute);
    setDate((prevDate) => prevDate + 1);
  };

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
              currentDay={props.date.getUTCDate()}
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
