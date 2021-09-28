import React from "react";
import IconMenu from "../IconMenu/IconMenu";
import MenuIcon from "@mui/icons-material/Menu";

import "./WatchSidebar.css";
import Menu from "../Menu/Menu";

function WatchSidebar(props) {
  return (
    <div className="watch-sidebar">
      {/* <IconMenu Icon={MenuIcon} /> */}
      <div className="menu-button">
        <Menu />
      </div>

      <div className="empty-side"></div>
    </div>
  );
}

export default WatchSidebar;
