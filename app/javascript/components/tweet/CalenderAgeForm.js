import React, { useState } from "react";
import CalenderMenu from "./CalenderMenu";
import onOutsideClick from "../onOutsideClick";
import AgeForm from "./AgeForm";
import DateDisplay from "./DateDisplay";

const CalenderAgeForm = (props) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCalender, setShowCalender] = useState(false);
  const [showTimeForm, setShowTimeForm] = useState(false);
  const date = new Date(props.time);

  if (showTimeForm) {
    return <AgeForm date={date} setDate={props.setTime} />;
  } else if (showCalender) {
    return (
      <DateDisplay
        date={date.getUTCMonth()}
        onClick={() => null}
        border={true}
        menu={true}
        children={
          <CalenderMenu
            date={date}
            modifyDate={(i, attribute) => {
              let newDate = date;
              if (attribute == "day") {
                newDate.setUTCDate(i);
              } else if (attribute == "month") {
                newDate.setUTCMonth(i);
              } else if (attribute == "year") {
                newDate.setUTCFullYear(date.getUTCFullYear() + i);
              }
              props.setTime(newDate.toUTCString());
            }}
          />
        }
      />
    );
  } else {
    return (
      <React.Fragment>
        <span className="dot-divider"></span>
        <div
          className={
            showDropdown ? "container dropdown age-form" : "hide-children"
          }
          onClick={(e) => {
            if (showDropdown) {
              return;
            }
            console.log(e.target.parentNode);
            setShowDropdown(true);
            onOutsideClick(
              { target: e.target.parentNode.parentNode },
              () => {},
              () => {
                setShowDropdown(false);
                setShowCalender(false);
                setShowTimeForm(false);
              }
            );
          }}
        >
          <span className="subtitle visible">Jun 2</span>
          <div className="dropdown">
            <span
              className="child"
              onClick={() => setShowTimeForm(true) || setShowDropdown(false)}
            >
              Set by Age
            </span>
            <span
              className="child"
              onClick={() => setShowCalender(true) || setShowDropdown(false)}
            >
              Set by Date
            </span>
          </div>
        </div>
      </React.Fragment>
    );
  }
};

export default CalenderAgeForm;
