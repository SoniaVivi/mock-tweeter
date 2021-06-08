import React, { useState } from "react";
import PropTypes from "prop-types";
import onOutsideClick from "./helpers/onOutsideClick";

const SourceLabel = (props) => {
  const [showEditor, setShowEditor] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [currentLabel, setCurrentLabel] = useState(props.label);
  const toggle = () => setShowEditor((prevState) => !prevState);
  const labels = [
    "Twitter for iPhone",
    "Twitter Web App",
    "Twitter for Android",
    "Custom",
  ];

  return (
    <div className={`${showEditor ? "dropdown container active" : ""}`}>
      {!showForm ? (
        <span
          onClick={(e) => {
            onOutsideClick(
              e,
              () => {
                setShowEditor(false);
                setShowForm(false);
              },
              () => {},
              true
            );
            toggle();
          }}
          className="source-label header"
        >
          {currentLabel}
        </span>
      ) : (
        <input
          type="text"
          className="source-label"
          value={currentLabel}
          onChange={(e) => {
            setCurrentLabel(e.target.value);
            props.setLabel(e.target.value);
          }}
        ></input>
      )}
      <div className={showEditor ? "dropdown" : "hidden"}>
        {labels.map((label) => {
          return (
            <div
              onClick={(e) => {
                if (label == "Custom") {
                  setShowForm(true);
                } else {
                  setCurrentLabel(label);
                  props.setLabel(label);
                }
                setShowEditor((prevState) => !prevState);
              }}
              className={`dropdown child${
                label == currentLabel ? " active" : ""
              }`}
            >
              {label}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SourceLabel;
