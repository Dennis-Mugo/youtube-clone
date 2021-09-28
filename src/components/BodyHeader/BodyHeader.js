import React, { useState } from "react";
import "./BodyHeader.css";
import logo from "./logo.png";
import { useHistory } from "react-router-dom";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MicIcon from "@mui/icons-material/Mic";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

import Tooltip from "@mui/material/Tooltip";

import UserAvatar from "../UserAvatar/UserAvatar";

function BodyHeader(props) {
  const [searchValue, setSearchValue] = useState("");
  const history = useHistory();
  const searchHandler = () => {
    if (searchValue) {
      history.push(`/search/${searchValue}`);
    }
  };
  return (
    <header className="body-header">
      <div className="header-left">
        <img src={logo} alt="Youtube" />
      </div>
      <div className="header-center">
        <form className="search">
          <div className="search-input">
            <input
              placeholder="Search"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
            />
          </div>
          <div className="search-icon" onClick={searchHandler}>
            <Tooltip title="Search">
              <SearchOutlinedIcon />
            </Tooltip>
          </div>
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              searchHandler();
            }}
            style={{ display: "none" }}
          ></button>
        </form>
        <div className="voice-search">
          <Tooltip title="Search with your voice">
            <MicIcon />
          </Tooltip>
        </div>
      </div>
      <div className="header-right">
        <Tooltip title="Create">
          <VideoCallOutlinedIcon />
        </Tooltip>
        <Tooltip title="Youtube apps">
          <AppsOutlinedIcon />
        </Tooltip>
        <Tooltip title="Notifications">
          <NotificationsNoneOutlinedIcon />
        </Tooltip>
        <UserAvatar />
      </div>
    </header>
  );
}

export default BodyHeader;
