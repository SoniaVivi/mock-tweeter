import React, { useState } from "react";
import NumberForm from "../NumberForm";

const Metadata = (props) => {
  return (
    <div className="row top-border tweet-metadata">
      <NumberForm
        value={props.retweets}
        setValue={props.setRetweets}
        fieldName={"Retweets"}
        focus={true}
      />
      <NumberForm
        value={props.likes}
        setValue={props.setLikes}
        fieldName={"Likes"}
        focus={true}
      />
    </div>
  );
};

export default Metadata;
