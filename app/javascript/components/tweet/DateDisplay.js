import React, { useState } from "react";
import PropTypes from "prop-types";
import Form from "./Form";
import onOutsideClick from "./helpers/onOutsideClick";
import { formatDate, months } from "./helpers/dateHelpers";

const dateDisplay = (props) => {
  return (
    <div
      className={`calender-header${props.border ? " active" : ""}`}
      onClick={props.onClick}
    >
      {!props.menu ? formatDate(props.date) : months[props.date]}
      {props.children}
    </div>
  );
};

export default dateDisplay;
