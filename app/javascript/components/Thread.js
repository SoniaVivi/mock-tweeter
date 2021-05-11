import React from "react";
import PropTypes from "prop-types";
import Tweet from "./Tweet";

const Thread = (props) => {
  return (
    <React.Fragment>
      <Tweet data={props.tweet} />
    </React.Fragment>
  );
};

export default Thread;
