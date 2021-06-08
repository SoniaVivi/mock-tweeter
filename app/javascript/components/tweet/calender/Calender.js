import React, { useState } from "react";
import onOutsideClick from "../helpers/onOutsideClick";
import DateDisplay from "../DateDisplay";
import CalenderMenu from "./CalenderMenu";
import { setByDateUnit } from "../helpers/dateHelpers";

const Calender = (props) => {
  const [showForm, setShowForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date(props.date));
  const modifyDate = (i, attribute) =>
    setSelectedDate((prevDate) => {
      let newDate = setByDateUnit(prevDate, attribute, i);
      props.setDate(newDate.toUTCString());
      return newDate;
    });

  if (showForm) {
    return (
      <DateDisplay
        date={selectedDate.getUTCMonth()}
        onClick={() => null}
        border={true}
        menu={true}
        children={<CalenderMenu date={selectedDate} modifyDate={modifyDate} />}
      />
    );
  } else {
    return (
      <DateDisplay
        date={selectedDate}
        onClick={(e) =>
          onOutsideClick(
            e,
            () => setShowForm((state) => !state),
            () => null,
            true
          )
        }
      />
    );
  }
};

export default Calender;
