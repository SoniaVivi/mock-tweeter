import React, { useState } from "react";
import PropTypes from "prop-types";
import { daysInMonth, fromatDate } from "./dateHelpers";

const CalenderDay = (props) => {
  return (
    <button
      className={`calender-day${
        props.date == props.currentDay ? " selected" : ""
      }`}
      onClick={props.onClick}
    >
      {props.date}
    </button>
  );
};

export default CalenderDay;
