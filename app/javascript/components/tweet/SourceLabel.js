import React, { useState } from "react";
import PropTypes from "prop-types";
import onOutsideClick from "../onOutsideClick";

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
    <div className={`source-label container${showEditor ? " active" : ""}`}>
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
      <div className={showEditor ? "dropdown source-label" : "hidden"}>
        {labels.map((label) => {
          return (
            <div
              onClick={(e) => {
                if (label == "Custom") {
                  setShowForm(true);
                  // onOutsideClick(
                  //   { target: e.target.parentNode.parentNode },
                  //   () => setShowForm((prevState) => !prevState),
                  //   () => {}
                  // );
                } else {
                  setCurrentLabel(label);
                  props.setLabel(label);
                }
                setShowEditor((prevState) => !prevState);
              }}
              className={`source-label child${
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
