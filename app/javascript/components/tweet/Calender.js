import React, { useState } from "react";
import PropTypes from "prop-types";
import Form from "./Form";
import onOutsideClick from "../onOutsideClick";
import DateDisplay from "./DateDisplay";
import CalenderMenu from "./CalenderMenu";
import { daysInMonth, fromatDate, months } from "./dateHelpers";

const Calender = (props) => {
  const [selectedDate, setSelectedDate] = useState(new Date(props.date));
  const modifyDate = (i, attribute) =>
    setSelectedDate((prevDate) => {
      let newDate = prevDate;
      if (attribute == "day") {
        newDate.setUTCDate(i);
      } else if (attribute == "month") {
        newDate.setUTCMonth(i);
      } else if (attribute == "year") {
        newDate.setUTCFullYear(prevDate.getUTCFullYear() + i);
      }
      setDisplay(
        <DateDisplay
          date={newDate.getUTCMonth()}
          onClick={() => null}
          border={true}
          menu={true}
          children={<CalenderMenu date={newDate} modifyDate={modifyDate} />}
        />
      );

      props.setDate(newDate.toUTCString());
      return newDate;
    });
  const [display, setDisplay] = useState(
    <DateDisplay
      date={selectedDate.getUTCMonth()}
      onClick={() => null}
      border={true}
      menu={true}
      children={<CalenderMenu date={selectedDate} modifyDate={modifyDate} />}
    />
  );

  return (
    <Form
      display={(toggleFunc) => (
        <DateDisplay
          date={selectedDate}
          onClick={(e) => onOutsideClick(e, toggleFunc, () => null, true)}
        />
      )}
      editor={(toggleFunc) => null}
      children={display}
    />
  );
};

export default Calender;
