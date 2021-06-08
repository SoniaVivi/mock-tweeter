import React from "react";
import TimeForm from "../TimeForm";
import Calender from "../calender/Calender";
import SourceLabel from "../SourceLabel";

const timeForm = (props) => {
  return (
    <div className="row date subtitle top-level">
      <TimeForm time={props.postedOn} setTime={props.setPostedOn} />
      <span className="dot-divider"></span>
      <Calender date={props.postedOn} setDate={props.setPostedOn} />
      <span className="dot-divider"></span>
      <SourceLabel label={props.label} setLabel={props.setLabel} />
    </div>
  );
};

export default timeForm;
