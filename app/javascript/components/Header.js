import React, { useState } from "react";
import PropTypes from "prop-types";
import html2canvas from "html2canvas";
import Svg from "./svgs/Svg";
import HeaderButton from "./header/HeaderButton";
import Popup from "./Popup";

const Header = (props) => {
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const takeScreenshot = () =>
    html2canvas(document.querySelector("[data-react-class='Thread']"), {
      allowTaint: true,
    }).then((result) => {
      setImage(result);
      getURL(result);
    });
  const saveToClipboard = () =>
    image.toBlob((blob) => {
      try {
        navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
      } catch (error) {
        setErrorMessage(<Popup text="Failed to copy screenshot" />);
        window.setTimeout(() => setErrorMessage(null), 1500);
      }
    });
  const getURL = (img) => {
    img.toBlob((blob) => {
      let url = URL.createObjectURL(blob);
      setImageURL(url);
    });
  };

  if (errorMessage) {
    return errorMessage;
  }

  return (
    <React.Fragment>
      {image && (
        <HeaderButton
          svg={<Svg type="clipboard" />}
          text="Copy"
          onClick={saveToClipboard}
        />
      )}
      <HeaderButton
        svg={<Svg type="camera" />}
        onClick={takeScreenshot}
        className="xl-long"
        text="Screenshot"
      />
      {image && (
        <HeaderButton
          svg={<Svg type="save" />}
          text="Download"
          className="long"
          type="link"
          fileName={new Date().toISOString().substring(0, 10)}
          href={imageURL}
        />
      )}
      {errorMessage}
    </React.Fragment>
  );
};

export default Header;
