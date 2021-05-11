import React, { useState } from "react";
import PropTypes from "prop-types";
import Form from "./Form";
import onOutsideClick from "../onOutsideClick";

const NameForm = (props) => {
  const [text, setText] = useState(props.name);

  return (
    <Form
      display={(toggleFunc) => (
        <span
          className={props.type == "display" ? "display-name" : "user-name"}
          onClick={(e) =>
            onOutsideClick(
              e,
              toggleFunc,
              () => {
                let newName = "";
                setText((prevText) => {
                  newName = prevText;
                  return prevText;
                });
                props.setName(newName);
              },
              true
            )
          }
        >
          {`${props.type == "user" ? "@" : ""}${text}`}
        </span>
      )}
      editor={() => (
        <input
          type="text"
          defaultValue={text}
          className="name editor"
          onChange={(e) => setText(e.target.value)}
        ></input>
      )}
    />
  );
};

export default NameForm;
