import React, { useState } from "react";
import PropTypes from "prop-types";
import Form from "./Form";
import { formatTime } from "./dateHelpers";

const TimeDisplay = (props) => {
  return <span onClick={props.onClick}>{formatTime(props.time)}</span>;
};

export default TimeDisplay;
