import React, { useState } from "react";
import NameForm from "./NameForm";
import TimeForm from "./TimeForm";
import Calender from "./Calender";

const NameDisplay = (props) => {
  const topLevel = props.topLevel;

  return (
    <div className={`name container${topLevel ? " top-level" : ""}`}>
      <div className={`name ${topLevel ? "column" : "row"}`}>
        <NameForm
          name={props.displayName}
          type="display"
          setName={props.setDisplayName}
        />
        <NameForm name={props.name} type="user" setName={props.setName} />
      </div>
      {/* ===============PLACEHOLDER=============== */}
      {!topLevel
        ? [
            <span className="dot-divider"></span>,
            <span className="subtitle">Jun 2</span>,
          ]
        : ""}
      <button className="dot-menu">...</button>
    </div>
  );
};
export default NameDisplay;
