import React, { useState } from "react";
import PropTypes from "prop-types";
import Form from "./Form";
import { isPM, formatHours, formatMinutes } from "./dateHelpers";
import onOutSideClick from "../onOutsideClick";
import TimeDisplay from "./TimeDisplay";
import Arrow from "../svgs/Arrow";
import onOutsideClick from "../onOutsideClick";

const TimeForm = (props) => {
  const [time, setTime] = useState(new Date(props.time));
  const [isTimePM, setIsTimePM] = useState(isPM(time));
  const [minutesHours, setMinutesHours] = useState({
    minutes: time.getUTCMinutes(),
    hours: time.getUTCHours(),
  });
  const inRange = (val, min, max) =>
    /^\d+$/.test(val) && val >= min && val <= max;
  const modifyMinutesHours = (attribute, value) =>
    setMinutesHours((prevState) => {
      return { ...prevState, [attribute]: value };
    });
  const modifyTime = () => {
    //Variables outside of this function do not receive their most recent value
    //if it has been changed since the initial page load. Wrapping it in their
    //respected setter allows for the inside body to receieve the most recent
    //value thus correctly updating state
    let string = "";
    setIsTimePM((prevPM) => {
      setMinutesHours((prevMinutesHours) => {
        let newMinsHours = prevMinutesHours;

        setTime((prevTime) => {
          let newTime = prevTime;
          if (inRange(newMinsHours.minutes, 0, 60)) {
            newTime.setUTCMinutes(newMinsHours.minutes);
          }

          if (!isTimePM && newMinsHours.hours == 12) {
            newTime.setUTCHours(0);
          } else if (inRange(newMinsHours.hours, 1, 12)) {
            newTime.setUTCHours(newMinsHours.hours);
          }
          newMinsHours = {
            minutes: newTime.getUTCMinutes(),
            hours: newTime.getUTCHours(),
          };
          const hours = newTime.getUTCHours();
          if (hours < 11 && prevPM) {
            newTime.setUTCHours(hours + 12);
          } else if (hours > 12 && !prevPM) {
            newTime.setUTCHours(hours - 12);
          }
          string = newTime.toUTCString();
          return newTime;
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
                let newTime = prevTime;
                const hours = prevTime.getUTCHours();
                newTime.setUTCHours(hours < 11 ? hours + 12 : hours - 12);
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
