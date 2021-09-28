import React, { Fragment, useState } from "react";
import IconMenu from "../IconMenu/IconMenu";
import "./Sidebar.css";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import ExploreIcon from "@mui/icons-material/Explore";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import Menu from "../Menu/Menu";

function Sidebar(props) {
  const [clicked, setClicked] = useState([true, false, false, false]);
  const handleClick = (index) => {
    setClicked(clicked.map((item, i) => i === index));
  };

  return (
    <div className="sidebar">
      {/* <TempDrawer /> */}
      <Menu />

      <IconMenu
        handleClick={handleClick}
        Icon={clicked[0] ? HomeRoundedIcon : HomeOutlinedIcon}
        title="Home"
        hoverEffect
        index={0}
      />
      <IconMenu
        handleClick={handleClick}
        Icon={clicked[1] ? ExploreIcon : ExploreOutlinedIcon}
        index={1}
        title="Explore"
        hoverEffect
      />
      <IconMenu
        handleClick={handleClick}
        Icon={clicked[2] ? SubscriptionsIcon : SubscriptionsOutlinedIcon}
        index={2}
        title="Subscriptions"
        hoverEffect
      />
      <IconMenu
        handleClick={handleClick}
        Icon={clicked[3] ? VideoLibraryIcon : VideoLibraryOutlinedIcon}
        index={3}
        title="Library"
        hoverEffect
      />
    </div>
  );
}

export default Sidebar;
