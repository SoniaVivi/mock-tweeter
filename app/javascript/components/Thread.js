import React, { useState } from "react";
import PropTypes from "prop-types";
import Tweet from "./Tweet";

const Thread = (props) => {
  const [data, setData] = useState({ 1: props.tweet, 2: props.tweet });

  return (
    <React.Fragment>
      <Tweet data={data} setData={setData} className="top-level" id={1} />
      <Tweet
        data={data}
        setData={setData}
        className="reply"
        child={true}
        parentId={1}
        id={2}
      />
    </React.Fragment>
  );
};

export default Thread;
