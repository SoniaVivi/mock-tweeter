import React from "react";
import TweetText from "./tweet/TweetText";
import ProfileForm from "./tweet/ProfileForm";
import Metadata from "./tweet/topLevel/Metadata";
import TweetTimeDisplay from "./tweet/topLevel/TweetTimeDisplay";
import NameDisplay from "./tweet/name/NameDisplay";
import ChildIconsContainer from "./tweet/ChildIconsContainer";

const Tweet = (props) => {
  const data = props.data[props.id];
  const className = props.className || " ";
  const isTopLevel = className == "top-level";
  let dividerClassName = null;
  props.dividerParent && (dividerClassName += "divider-parent");
  props.dividerChild && (dividerClassName += " divider  bottom-border");
  const createModifyDataFunction = (keyName) => (newValue) => {
    props.setData((prevState) => {
      return {
        ...prevState,
        [props.id]: { ...data, ...{ [keyName]: newValue } },
      };
    });
  };

  const topLevelElements = [
    <TweetTimeDisplay
      postedOn={data.postedOn}
      label={data.label}
      setPostedOn={createModifyDataFunction("postedOn")}
      setLabel={createModifyDataFunction("label")}
    />,
    <Metadata
      retweets={data.retweets}
      likes={data.likes}
      setRetweets={createModifyDataFunction("retweets")}
      setLikes={createModifyDataFunction("likes")}
    />,
  ];

  const nameDisplayElement = (
    <NameDisplay
      topLevel={isTopLevel}
      displayName={data.displayName}
      name={data.name}
      postedOn={data.postedOn}
      setDisplayName={createModifyDataFunction("displayName")}
      setName={createModifyDataFunction("name")}
      setPostedOn={createModifyDataFunction("postedOn")}
      addChild={props.addTweet}
    />
  );

  return (
    <div
      className={`tweet container ${className} ${
        dividerClassName || "bottom-border"
      }`}
    >
      <div
        className={`poster ${
          !!props.dividerParent || !!props.dividerChild ? "column" : "row"
        }`}
      >
        <ProfileForm
          profileImage={data.profileImage}
          setProfileImage={createModifyDataFunction("profileImage")}
        />
        {isTopLevel ? nameDisplayElement : ""}
        {!!props.dividerParent ? (
          <div className="vertical divider parent"></div>
        ) : (
          ""
        )}
      </div>
      <div className={`wrapper ${className}`}>
        {!isTopLevel ? nameDisplayElement : ""}
        {!isTopLevel && !props.dividerChild ? (
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
        <ChildIconsContainer
          className={className}
          editable={!isTopLevel}
          replies={data.replies}
          retweets={data.retweets}
          likes={data.likes}
          setReplies={createModifyDataFunction("replies")}
          setRetweets={createModifyDataFunction("retweets")}
          setLikes={createModifyDataFunction("likes")}
        />
      </div>
    </div>
  );
};

export default Tweet;
