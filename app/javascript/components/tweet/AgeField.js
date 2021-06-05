import React, { useState } from "react";
import { setUTCUnits, inRange } from "./dateHelpers";

const AgeField = (props) => {
  const [timeValue, setTimeValue] = useState(props.data[props.timeUnit]);

  return (
    <React.Fragment>
      <input
        className="time age-form"
        value={timeValue}
        onChange={(e) => {
          if (inRange(e.target.value, 0, props.timeUnit == "hours" ? 24 : 60)) {
            props.setData(
              setUTCUnits(props.data.date, {
                [props.timeUnit]: Number(e.target.value),
              })[0].toUTCString()
            );
          }
          setTimeValue(e.target.value);
        }}
      />
      {!props.noDivider ? (
        <span className="time separator age-form">:</span>
      ) : (
        ""
      )}
    </React.Fragment>
  );
};

export default AgeField;
