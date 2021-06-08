import React, { useState } from "react";
import NameForm from "./NameForm";
import CalenderAgeForm from "./CalenderAgeForm";

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
      {!topLevel ? (
        <CalenderAgeForm time={props.postedOn} setTime={props.setPostedOn} />
      ) : (
        ""
      )}
      <button className="dot-menu" onClick={props.addChild}>
        ...
      </button>
    </div>
  );
};
export default NameDisplay;
