import React, { useState } from "react";
import PropTypes from "prop-types";

const Form = (props) => {
  const [showEditor, setShowEditor] = useState(false);
  const toggleEditor = () => setShowEditor((prevState) => !prevState);

  if (showEditor) {
    return (
      <React.Fragment>
        {props.editor(toggleEditor)}
        {props.children}
      </React.Fragment>
    );
  } else {
    return <React.Fragment>{props.display(toggleEditor)}</React.Fragment>;
  }
};

export default Form;
