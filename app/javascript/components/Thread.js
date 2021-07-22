import React, { useState } from "react";
import PropTypes from "prop-types";
import Tweet from "./Tweet";

const Thread = (props) => {
  const [data, setData] = useState([props.tweet]);
  const addTweet = (parentId, divider = false) =>
    setData((prevState) => {
      let newData = prevState;
      newData[parentId].dividerParent = parentId != 0;
      newData[parentId].divider = false;

      const newTweet = {
        ...props.tweet,
        parentId: parentId,
        divider: divider,
      };
      newData.splice(parentId + 1, 0, newTweet);
      return [...newData];
    });

  return (
    <React.Fragment>
      {data.map((tweetData, i) => (
        <Tweet
          data={data}
          setData={setData}
          className={i == 0 ? "top-level" : "reply"}
          id={i}
          child={!!tweetData.parentId}
          parentId={tweetData.parentId}
          addTweet={() => addTweet(i, i != 0)}
          dividerChild={tweetData.divider}
          dividerParent={tweetData.dividerParent}
        />
      ))}
    </React.Fragment>
  );
};

export default Thread;
