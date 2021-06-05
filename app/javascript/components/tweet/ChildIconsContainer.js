import React, { useState } from "react";
import PropTypes from "prop-types";
import Heart from "../svgs/Heart";
import Reply from "../svgs/Reply";
import Retweet from "../svgs/Retweet";
import Share from "../svgs/Share";
import IconContainer from "./IconContainer";

const ChildIconsContainer = (props) => {
  return (
    <div
      className={`row tweet-options ${props.className}${
        !props.editable ? " top-border" : ""
      }`}
    >
      <IconContainer
        children={<Reply />}
        editable={props.editable}
        value={props.replies}
        setValue={props.setReplies}
      />
      <IconContainer
        children={<Retweet />}
        editable={props.editable}
        value={props.retweets}
        setValue={props.setRetweets}
      />
      <IconContainer
        children={<Heart />}
        editable={props.editable}
        value={props.likes}
        setValue={props.setLikes}
      />
      <IconContainer children={<Share />} editable={false} />
    </div>
  );
};

export default ChildIconsContainer;
