import React, { useState } from "react";
import PropTypes from "prop-types";

const ProfileForm = (props) => {
  const [showEditor, setShowEditor] = useState(false);
  const [imgURL, setImgURL] = useState(props.profileImage);
  const toggle = () => setShowEditor((prevState) => !prevState);

  if (!showEditor) {
    return <img className="user-icon" onClick={toggle} src={imgURL}></img>;
  }

  return (
    <React.Fragment>
      <img className="user-icon" src={imgURL}></img>
      <div
        className="drop-form container"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => e.preventDefault()}
        onClick={toggle}
      >
        <div
          className="drop-form row"
          onDrop={(e) => {
            e.preventDefault();
            const file = e.dataTransfer.files[0];
            if (e.dataTransfer.files.length != 1) {
              return console.log("Cannot drop more nor less than 1 files");
            } else if (file.name.match(/(\.png|\.jpe?g)$/)) {
              let fr = new FileReader();
              fr.onload = () => {
                setImgURL(fr.result);
                props.setProfileImage(fr.result);
                toggle();
              };
              fr.readAsDataURL(file);
            }
          }}
        >
          <span>Drop image here</span>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProfileForm;
