import React, { useState } from "react";
import CalenderMenu from "./CalenderMenu";
import onOutsideClick from "../onOutsideClick";
import AgeForm from "./AgeForm";
import DateDisplay from "./DateDisplay";
import { setByDateUnit, relativeTime, cropDate } from "./dateHelpers";

const CalenderAgeForm = (props) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCalender, setShowCalender] = useState(false);
  const [showTimeForm, setShowTimeForm] = useState(false);
  const date = new Date(props.time);
  const formatRelativeTime = (units, quantity) =>
    `${quantity}${units.slice(0, 1)}`;

  const dateDisplay = () => {
    if (date.getUTCHours() || date.getUTCMinutes() || date.getUTCSeconds()) {
      return (
        <span className="subtitle visible">
          {relativeTime(date, formatRelativeTime)}
        </span>
      );
    } else {
      return <span className="subtitle visible">{cropDate(date)}</span>;
    }
  };

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
          {dateDisplay()}
          <div className="dropdown">
            <span
              className="child"
              onClick={() => setShowTimeForm(true) || setShowDropdown(false)}
            >
              Set by Age
            </span>
            <span
              className="child"
              onClick={() => {
                setShowCalender(true) || setShowDropdown(false);
                props.setTime(
                  (() => {
                    let newDate = date;
                    newDate.setUTCHours(0);
                    newDate.setUTCMinutes(0);
                    newDate.setUTCSeconds(0);
                    return newDate.toUTCString();
                  })()
                );
              }}
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
