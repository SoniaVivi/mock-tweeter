import React, { useState } from "react";
import PropTypes from "prop-types";
import Heart from "./svgs/Heart";
import Reply from "./svgs/Reply";
import Retweet from "./svgs/Retweet";
import Share from "./svgs/Share";
import TweetText from "./tweet/TweetText";
import ProfileForm from "./tweet/ProfileForm";
import Metadata from "./tweet/topLevel/Metadata";
import TweetTimeDisplay from "./tweet/topLevel/TweetTimeDisplay";
import NameDisplay from "./tweet/NameDisplay";

const Tweet = (props) => {
  const data = props.data[props.id];
  const className = props.className || " ";
  const isTopLevel = className == "top-level";
  const createModifyDataFunction = (keyName) => (newValue) => {
    props.setData((prevState) => {
      return {
        ...prevState,
        [props.id]: { ...data, ...{ [keyName]: newValue } },
      };
    });
  };

  const topLevelElements = [
    <Metadata
      retweets={data.retweets}
      likes={data.likes}
      setRetweets={createModifyDataFunction("retweets")}
      setLikes={createModifyDataFunction("likes")}
    />,
    <TweetTimeDisplay
      postedOn={data.postedOn}
      label={data.label}
      setPostedOn={createModifyDataFunction("postedOn")}
      setLabel={createModifyDataFunction("label")}
    />,
  ];

  const nameDisplayElement = (
    <NameDisplay
      topLevel={isTopLevel}
      displayName={data.displayName}
      name={data.name}
      setDisplayName={createModifyDataFunction("displayName")}
      setName={createModifyDataFunction("name")}
    />
  );

  return (
    <div className={`tweet container bottom-border ${className}`}>
      <div className="poster row">
        <ProfileForm
          profileImage={data.profileImage}
          setProfileImage={createModifyDataFunction("profileImage")}
        />
        {isTopLevel ? nameDisplayElement : ""}
      </div>
      <div className={`wrapper ${className}`}>
        {!isTopLevel ? nameDisplayElement : ""}
        {props.child ? (
          <span className="replying-to container">
            Replying to <a>@{props.data[props.parentId].name}</a>
          </span>
        ) : (
          ""
        )}
        <TweetText
          body={data.body}
          setBody={createModifyDataFunction("body")}
          topLevel={isTopLevel}
        />
        {isTopLevel ? topLevelElements : ""}
        <div
          className={`row tweet-options ${className}${
            isTopLevel ? " top-border" : ""
          }`}
        >
          <Reply />
          <Retweet />
          <Heart />
          <Share />
        </div>
      </div>
    </div>
  );
};

export default Tweet;
