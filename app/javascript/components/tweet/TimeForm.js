import React, { useState } from "react";
import PropTypes from "prop-types";
import Form from "./Form";
import { isPM, swapMeridiem, setUTCUnits } from "./dateHelpers";
import TimeDisplay from "./TimeDisplay";
import onOutsideClick from "../onOutsideClick";

const TimeForm = (props) => {
  const [time, setTime] = useState(new Date(props.time));
  const [isTimePM, setIsTimePM] = useState(isPM(time));
  const [minutesHours, setMinutesHours] = useState({
    minutes: time.getUTCMinutes(),
    hours: time.getUTCHours(),
  });
  const modifyMinutesHours = (attribute, value) =>
    setMinutesHours((prevState) => {
      return { ...prevState, [attribute]: value };
    });
  const modifyTime = () => {
    //Variables outside of this function do not receive their most recent value
    //if it has been changed since the initial page load. Wrapping it in their
    //respective setter allows for the inside body to receieve the most recent
    //value
    setIsTimePM((prevPM) => {
      setMinutesHours((prevMinutesHours) => {
        let newMinsHours = prevMinutesHours;

        setTime((prevTime) => {
          const newTime = setUTCUnits(prevTime, newMinsHours, prevPM);
          newMinsHours = newTime[1];
          return newTime[0];
        });
        return newMinsHours;
      });
      return prevPM;
    });
    props.setTime(time.toUTCString());
  };

  return (
    <Form
      editor={() => null}
      display={(toggle) => (
        <TimeDisplay
          onClick={(e) => onOutsideClick(e, toggle, modifyTime, true)}
          time={time}
        />
      )}
      children={
        <div className="time container">
          <input
            value={minutesHours.hours}
            className="time"
            onChange={(e) => modifyMinutesHours("hours", e.target.value)}
          ></input>
          <span className="time separator">:</span>
          <input
            value={minutesHours.minutes}
            className="time"
            onChange={(e) => modifyMinutesHours("minutes", e.target.value)}
          ></input>
          <button
            className="time"
            onClick={() => {
              setTime((prevTime) => {
                let newTime = swapMeridiem(prevTime);
                setIsTimePM((prevState) => !prevState);
                props.setTime(newTime.toUTCString());
                return newTime;
              });
            }}
          >
            {isTimePM ? "PM" : "AM"}
          </button>
        </div>
      }
    />
  );
};

export default TimeForm;
