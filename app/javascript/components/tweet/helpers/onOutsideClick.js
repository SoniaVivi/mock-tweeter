const onOutsideClick = (event, toggle, callback, parent = false) => {
  let container;
  if (!parent) {
    container = event.target;
  } else {
    container = event.target.parentNode;
  }
  toggle();

  const closeMenu = (mouseUpEvent) => {
    let clickedElement = mouseUpEvent.target;

    if (!container.contains(clickedElement) || clickedElement == container) {
      callback();
      toggle();
      document.removeEventListener("mouseup", closeMenu);
    }
  };
  document.addEventListener("mouseup", closeMenu);
};

export default onOutsideClick;
