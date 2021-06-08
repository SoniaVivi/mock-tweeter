import React, { useState } from "react";
import PropTypes from "prop-types";
import Arrow from "../svgs/Arrow";
import onOutsideClick from "./helpers/onOutsideClick";

const NumberForm = (props) => {
  const [showEditor, setShowEditor] = useState(!!props.onlyForm);
  const [fieldValue, setFieldValue] = useState(props.value);
  const toggle = () => setShowEditor((prevState) => !prevState);
  const hasOnlyDigits = (val) => /^\d+$/.test(val);
  const increment = () =>
    setFieldValue((prevVal) => {
      !!props.onlyForm && props.setValue(prevVal + 1);
      return prevVal + 1;
    });
  const decrement = () =>
    setFieldValue((prevVal) => {
      !!props.onlyForm && props.setValue(prevVal - 1);
      return prevVal - 1;
    });

  const saveValue = () => {
    let val;
    setFieldValue((prevVal) => (val = prevVal));
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
        } ${props.className}`}
      >
        <input
          className="tweet-metadata"
          value={fieldValue}
          onChange={(e) => {
            if (!showEditor) {
              hasOnlyDigits(e.target.value) && setFieldValue(e.target.value);
            } else {
              props.setValue(e.target.value), setFieldValue(e.target.value);
            }
          }}
        ></input>
        <div className="tweet-metadata arrow-container">
          <Arrow type="up" onClick={increment} />
          <Arrow type="down" onClick={decrement} />
        </div>
        <span>{props.fieldName}</span>
      </div>
    );
  }
};

export default NumberForm;
// onChange={(e) => !!props.onlyForm && saveValue(e.target.value)}
