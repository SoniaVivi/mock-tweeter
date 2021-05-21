import React, { useState } from "react";
import PropTypes from "prop-types";
import Form from "./Form";

const TweetText = (props) => {
  const [text, setText] = useState(props.body);
  const [previousText, setPreviousText] = useState(props.body);
  const [overflow, setOverFlow] = useState(false);

  return (
    <Form
      editor={(toggleFunc) => (
        <div className={`tweet-text editor${overflow ? " red-border" : ""}`}>
          <textarea
            className="bottom-border"
            onChange={(e) => {
              console.log(typeof e.target.value, e.target.value.length > 280);
              setOverFlow(e.target.value.length > 280);
              setText(e.target.value);
            }}
            defaultValue={text}
          ></textarea>
          <div className="editor-button row">
            {overflow ? (
              <div className="overflow-message">
                <div>Tweet length over 280 characters.</div>
                <div>Currently {text.length}</div>
              </div>
            ) : (
              ""
            )}
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
