import React, { useState } from "react";
import PropTypes from "prop-types";
import Tweet from "./Tweet";

const Thread = (props) => {
  const [data, setData] = useState({ 0: props.tweet });
  const addTweet = (parentId, divider = false) =>
    setData((prevState) => {
      let newData = {
        ...prevState,

        ...{
          [Object.keys(prevState).length]: {
            ...props.tweet,
            parentId: parentId,
            divider: divider,
          },
        },
      };
      newData[parentId].dividerParent = parentId != 0;
      return newData;
    });

  return (
    <React.Fragment>
      {Object.values(data).map((tweetData, index) => (
        <Tweet
          data={data}
          setData={setData}
          className={index == 0 ? "top-level" : "reply"}
          id={index}
          child={!!tweetData.parentId}
          parentId={tweetData.parentId}
          id={index}
          addTweet={() => addTweet(index, index != 0)}
          dividerChild={tweetData.divider}
          dividerParent={tweetData.dividerParent}
        />
      ))}

      {/* <Tweet
        data={data}
        setData={setData}
        className="reply"
        child={true}
        parentId={1}
        id={2}
      /> */}
    </React.Fragment>
  );
};

export default Thread;
