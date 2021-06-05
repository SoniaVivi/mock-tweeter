import React, { useState } from "react";
import NameForm from "./NameForm";

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
      {!topLevel ? (
        <React.Fragment>
          <span className="dot-divider"></span>
          <span className="subtitle">Jun 2</span>
          <button className="dot-menu">...</button>
        </React.Fragment>
      ) : (
        ""
      )}
    </div>
  );
};
export default NameDisplay;
