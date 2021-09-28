import React, { useState } from "react";
import "./UserAvatar.css";
import Avatar from "@mui/material/Avatar";
import { useSelector } from "react-redux";
import { IconButton, ListItemIcon, ListItemText } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import ut from "../../app/utils/utils";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

function UserAvatar(props) {
  const selectUserAvatar = (state) => state?.user[0]?.avatar;
  const userAvatar = useSelector(selectUserAvatar);
  const history = useHistory();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    ut.setCookie("username", "", -1);
    ut.setCookie("email", "", -1);
    ut.setCookie("avatar", "", -1);

    dispatch({ type: "user/removeUser" });
    history.push("/");
    handleClose();
  };
  return (
    <div className="user-avatar">
      <IconButton
        id="button"
        aria-controls="menu"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Avatar className="avatar" src={userAvatar} alt="user" />
      </IconButton>

      <Menu
        id="menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "button",
        }}
      >
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <LogoutRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </MenuItem>
      </Menu>
    </div>
  );
}

export default UserAvatar;
