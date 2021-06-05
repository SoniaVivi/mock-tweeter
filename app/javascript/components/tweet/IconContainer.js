import React, { useState } from "react";
import NumberForm from "./NumberForm";
import onOutsideClick from "../onOutsideClick";

const IconContainer = (props) => {
  const [showForm, setShowForm] = useState(false);

  if (props.editable) {
    return (
      <div
        className={`icon-container ${props.editable ? "child" : ""} ${
          showForm ? "active" : ""
        }`}
        onClick={(e) => {
          if (props.editable && !showForm) {
            setShowForm(true);
            onOutsideClick(
              e,
              () => {},
              () => setShowForm(false),
              true
            );
          }
        }}
      >
        {props.children}

        {!showForm && props.value ? (
          <span className="counter metadata subtitle">{props.value}</span>
        ) : (
          ""
        )}
        {showForm ? (
          <NumberForm
            className={showForm ? "" : "hidden"}
            onlyForm={true}
            value={props.value}
            setValue={props.setValue}
          />
        ) : (
          ""
        )}
      </div>
    );
  } else {
    return props.children;
  }
};

export default IconContainer;
