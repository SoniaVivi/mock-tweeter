import React, { useState } from "react";
import Form from "../Form";
import onOutsideClick from "../helpers/onOutsideClick";

const NameForm = (props) => {
  const [showForm, setShowForm] = useState(false);
  const [text, setText] = useState(props.name);
  const toggle = () => setShowForm((prevState) => !prevState);

  if (showForm) {
    return (
      <input
        type="text"
        defaultValue={text}
        className="name editor"
        onChange={(e) => setText(e.target.value)}
      ></input>
    );
  } else {
    return (
      <span
        className={props.type == "display" ? "display-name" : "user-name"}
        onClick={(e) =>
          onOutsideClick(
            e,
            toggle,
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
    );
  }
};

export default NameForm;
