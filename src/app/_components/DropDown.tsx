import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

function DropdownMenu() {
  const buttonRef = useRef();
  const menuRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [menuCoord, setMenuCoord] = useState(null);

  function clickOutsideListener(event) {
    // Clicked element is a descendant of
    // the menu or button.
    if (
      buttonRef.current?.contains(event.target) ||
      menuRef.current == null ||
      menuRef.current?.contains(event.target)
    ) {
      return;
    }

    setIsOpen(false);
  }

  useEffect(() => {
    document.addEventListener("mousedown", clickOutsideListener);
    document.addEventListener("touchstart", clickOutsideListener);

    return () => {
      document.removeEventListener("mousedown", clickOutsideListener);
      document.removeEventListener("touchstart", clickOutsideListener);
    };
  }, []);

  return (
    <>
      <button
        ref={buttonRef}
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) {
            const buttonEl = buttonRef.current;
            const coord = {
              top: buttonEl.offsetTop + buttonEl.offsetHeight,
              left: buttonEl.offsetLeft,
            };
            setMenuCoord(coord);
          } else {
            setMenuCoord(null);
          }
        }}
      >
        Actions
      </button>
      {isOpen &&
        createPortal(
          <div
            ref={menuRef}
            className="menu-list"
            role="menu"
            style={{
              top: menuCoord.top,
              left: menuCoord.left,
            }}
          >
            <div>New File</div>
            <div>Save</div>
            <div>Delete</div>
          </div>,
          document.querySelector("body"),
        )}
    </>
  );
}

export default function DropDown() {
  return <DropdownMenu position="start" />;
}
