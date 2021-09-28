import React from "react";
import "./IconMenu.css";
import { useHistory } from "react-router-dom";

function IconMenu({ title, Icon, hoverEffect, index, handleClick }) {
  const history = useHistory();
  return (
    <div
      className={hoverEffect ? "icon-menu-hover" : "icon-menu"}
      onClick={() => {
        title && handleClick(index);
        switch (title) {
          case "Home": {
            history.push("/");
            break;
          }
          default: {
            return;
          }
        }
      }}
    >
      <p className="icon">{<Icon />}</p>
      {title && <p className="menu-title">{title}</p>}
    </div>
  );
}

export default IconMenu;
