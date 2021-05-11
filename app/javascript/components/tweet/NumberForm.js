import React, { useState } from "react";
import PropTypes from "prop-types";
import Arrow from "../svgs/Arrow";
import onOutsideClick from "../onOutsideClick";

const NumberForm = (props) => {
  const [showEditor, setShowEditor] = useState(false);
  const [fieldValue, setFieldValue] = useState(props.value);
  const toggle = () => setShowEditor((prevState) => !prevState);
  const hasOnlyDigits = (val) => /^\d+$/.test(val);
  const arrowValueFunctions = {
    increment: () => setFieldValue((prevVal) => prevVal + 1),
    decrement: () => setFieldValue((prevVal) => prevVal - 1),
  };
  const saveValue = () => {
    let val;
    setFieldValue((prevVal) => {
      return (val = prevVal);
    });
    props.setValue(val);
  };

  if (!showEditor) {
    return (
      <div
        className={`tweet-metadata container${props.focus ? " focus" : ""}`}
        onClick={(e) => onOutsideClick(e, toggle, saveValue, true)}
      >
        <strong className="counter">{fieldValue}</strong>
        <span>{props.fieldName}</span>
      </div>
    );
  } else {
    return (
      <div
        className={`tweet-metadata container active${
          props.focus ? " focus" : ""
        }`}
      >
        <input
          className="tweet-metadata"
          value={fieldValue}
          onChange={(e) =>
            hasOnlyDigits(e.target.value) ? setFieldValue(e.target.value) : ""
          }
        ></input>
        <div className="tweet-metadata arrow-container">
          <Arrow type="up" onClick={arrowValueFunctions.increment} />
          <Arrow type="down" onClick={arrowValueFunctions.decrement} />
        </div>
        <span>{props.fieldName}</span>
      </div>
    );
  }
};

export default NumberForm;
