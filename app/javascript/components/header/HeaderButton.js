import React, { useState } from "react";
import PropTypes from "prop-types";
import Svg from "../svgs/Svg";

const Header = (props) => {
  const [showText, setShowText] = useState(false);
  const [focus, setFocus] = useState(false);
  const mouseEnter = () => {
    setFocus(true);
    window.setTimeout(() => setShowText(true), 450);
  };
  const mouseLeave = () => {
    setFocus(false);
    setShowText(false);
    window.setTimeout(() => setShowText(false), 450);
  };

  if (props.type == "link") {
    return (
      <a
        onMouseEnter={mouseEnter}
        onMouseLeave={mouseLeave}
        className={`header-button ${props.className}${focus ? " expand" : ""}`}
        download={props.fileName}
        href={props.href}
      >
        {props.svg}
        <span>{showText && focus ? props.text : ""}</span>
      </a>
    );
  }
  return (
    <button
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
      onClick={props.onClick}
      className={`header-button ${props.className}${focus ? " expand" : ""}`}
    >
      {props.svg}
      <span>{showText && focus ? props.text : ""}</span>
    </button>
  );
};

export default Header;
