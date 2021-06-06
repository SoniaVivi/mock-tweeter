import React, { useState } from "react";
import CalenderMenu from "./CalenderMenu";
import onOutsideClick from "../onOutsideClick";
import AgeForm from "./AgeForm";
import DateDisplay from "./DateDisplay";
import { setByDateUnit } from "./dateHelpers";

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
            modifyDate={(i, attribute) =>
              props.setTime(setByDateUnit(date, attribute, i).toUTCString())
            }
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
