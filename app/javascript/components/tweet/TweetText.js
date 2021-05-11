import React, { useState } from "react";
import PropTypes from "prop-types";
import Form from "./Form";

const TweetText = (props) => {
  const [text, setText] = useState(props.body);
  const [previousText, setPreviousText] = useState(props.body);

  return (
    <Form
      editor={(toggleFunc) => (
        <div className="tweet-text editor">
          <textarea
            className="bottom-border"
            onChange={(e) => setText(e.target.value)}
            defaultValue={text}
          ></textarea>
          <div className="editor-button row">
            <button
              className="editor-button"
              onClick={() => {
                setText(previousText);
                toggleFunc();
              }}
            >
              Cancel
            </button>
            <button
              className="editor-button"
              onClick={() => {
                props.setBody(text);
                setPreviousText(text);
                toggleFunc();
              }}
            >
              Save
            </button>
          </div>
        </div>
      )}
      display={(toggleFunc) => (
        <p className="tweet focus text" onClick={toggleFunc}>
          {text}
        </p>
      )}
    />
  );
};

export default TweetText;
