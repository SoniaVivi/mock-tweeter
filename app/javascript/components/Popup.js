import React from "react";
import PropTypes from "prop-types";

const Popup = (props) => {
  const message = props.text || "Something went wrong :(";
  return (
    <div className="popup container active">
      <div className="popup">{message}</div>
    </div>
  );
};

export default Popup;
