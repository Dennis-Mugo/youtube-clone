import React, { Fragment, useState } from "react";
import "./Menu.css";

import MenuIcon from "@mui/icons-material/Menu";

import ExploreIcon from "@mui/icons-material/Explore";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import IconButton from "@mui/material/IconButton";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import HomeRounded from "@mui/icons-material/HomeRounded";
import logo from "../BodyHeader/logo.png";
import { useHistory } from "react-router-dom";

function Menu(props) {
  const history = useHistory();
  const icons = [
    <HomeRounded />,
    <ExploreIcon />,
    <SubscriptionsIcon />,
    <VideoLibraryIcon />,
  ];

  const [drawerState, setDrawerState] = useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawerState({ ...drawerState, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem style={{ display: "flex", justifyContent: "flex-start" }}>
          <IconButton onClick={toggleDrawer(anchor, false)}>
            <MenuIcon />
          </IconButton>
          <img
            src={logo}
            alt="logo"
            width="100"
            style={{ marginLeft: "10px" }}
          />
        </ListItem>
        <Divider />
        {["Home", "Explore", "Subscriptions", "Library"].map((text, index) => (
          <ListItem
            button
            key={text}
            onClick={() => {
              text === "Home" && history.push("/");
            }}
          >
            <ListItemIcon>{icons[index]}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  const anchor = "left";

  return (
    <div>
      <Fragment>
        {/* <button onClick={toggleDrawer(anchor, true)}>more</button> */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "58px",
          }}
        >
          <IconButton
            aria-label="menu"
            className="icon-menu"
            onClick={toggleDrawer(anchor, true)}
          >
            <MenuIcon />
          </IconButton>
        </div>
        <Drawer
          anchor={anchor}
          open={drawerState[anchor]}
          onClose={toggleDrawer(anchor, false)}
        >
          {list(anchor)}
        </Drawer>
      </Fragment>
    </div>
  );
}

export default Menu;
