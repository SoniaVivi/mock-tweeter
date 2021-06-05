import React, { useState } from "react";
import AgeField from "./AgeField";

const AgeForm = (props) => {
  const [timeData, setTimeData] = useState({
    seconds: props.date.getUTCSeconds(),
    minutes: props.date.getUTCMinutes(),
    hours: props.date.getUTCHours(),
    date: props.date,
  });

  return (
    <div className="container time age-form">
      <AgeField timeUnit="hours" data={timeData} setData={props.setDate} />
      <AgeField timeUnit="minutes" data={timeData} setData={props.setDate} />
      <AgeField
        timeUnit="seconds"
        data={timeData}
        setData={props.setDate}
        noDivider={true}
      />
    </div>
  );
};

export default AgeForm;
