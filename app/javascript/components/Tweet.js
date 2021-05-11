import React, { useState } from "react";
import PropTypes from "prop-types";
import Heart from "./svgs/Heart";
import Reply from "./svgs/Reply";
import Retweet from "./svgs/Retweet";
import Share from "./svgs/Share";
import TweetText from "./tweet/TweetText";
import NameForm from "./tweet/NameForm";
import Calender from "./tweet/Calender";
import TimeForm from "./tweet/TimeForm";
import SourceLabel from "./tweet/SourceLabel";
import NumberForm from "./tweet/NumberForm";
import ProfileForm from "./tweet/ProfileForm";

const Tweet = (props) => {
  const [data, setData] = useState(props.data);
  const createModifyAttributeFunction = (keyName) => {
    return (newValue) => {
      setData((prevState) => {
        console.log({ ...prevState, ...{ [keyName]: newValue } });
        return { ...prevState, ...{ [keyName]: newValue } };
      });
    };
  };

  return (
    <div className="tweet container bottom-border">
      <div className="poster row">
        {/*Tweet does not currently have a profile picture column present*/}
        <ProfileForm />
        <div className="name column">
          <NameForm
            name={data.displayName}
            type="display"
            setName={createModifyAttributeFunction("displayName")}
          />
          <NameForm
            name={data.name}
            type="user"
            setName={createModifyAttributeFunction("name")}
          />
        </div>
        <button className="dot-menu">...</button>
      </div>
      <TweetText
        body={data.body}
        setBody={createModifyAttributeFunction("body")}
      />
      <div className="row date focus subtitle">
        <TimeForm
          time={data.postedOn}
          setTime={createModifyAttributeFunction("postedOn")}
        />
        <span className="dot-divider"></span>
        <Calender
          date={data.postedOn}
          setDate={createModifyAttributeFunction("postedOn")}
        />
        <span className="dot-divider"></span>
        <SourceLabel
          label={data.label}
          setLabel={createModifyAttributeFunction("label")}
        />
      </div>
      <div className="row top-border tweet-metadata">
        <NumberForm
          value={data.retweets}
          setValue={createModifyAttributeFunction("retweets")}
          fieldName={"Retweets"}
          focus={true}
        />
        <NumberForm
          value={data.likes}
          setValue={createModifyAttributeFunction("likes")}
          fieldName={"Likes"}
          focus={true}
        />
      </div>
      <div className="row top-border tweet-options focus">
        <Reply />
        <Retweet />
        <Heart />
        <Share />
      </div>
    </div>
  );
};

export default Tweet;
