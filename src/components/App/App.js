import React, { useEffect } from "react";
import Body from "../Body/Body";
import Sidebar from "../Sidebar/Sidebar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import WatchSidebar from "../WatchSidebar/WatchSidebar";
import WatchBody from "../WatchBody/WatchBody";
import SearchResults from "../SearchResults/SearchResults";
import { useDispatch, useSelector } from "react-redux";
import Login from "../Login/Login";
import ut from "../../app/utils/utils";

function App() {
  const dispatch = useDispatch();
  const selectUser = (state) => state.user;
  let user = useSelector(selectUser);
  if (!user.length) {
    if (
      ut.cookieExists("username") &&
      ut.cookieExists("email") &&
      ut.cookieExists("avatar")
    ) {
      let details = {
        userName: ut.getCookie("username"),
        email: ut.getCookie("email"),
        avatar: ut.getCookie("avatar"),
      };
      dispatch({ type: "user/addUser", payload: details });
      user = [details];
    }
  }

  if (user.length) {
    ut.setCookie("username", user[0].userName, 10);
    ut.setCookie("email", user[0].email, 10);
    ut.setCookie("avatar", user[0].avatar, 10);
  }
  // console.log(user);
  useEffect(() => {}, []);

  return (
    <div className="app">
      <Router>
        {!user.length ? (
          <Login />
        ) : (
          <Switch>
            <Route exact path="/">
              <Sidebar />
              <Body />
            </Route>
            <Route path="/watch/:videoId">
              <WatchSidebar />
              <WatchBody />
            </Route>
            <Route path="/search/:searchQuery">
              <Sidebar />
              <SearchResults />
            </Route>
          </Switch>
        )}
      </Router>
    </div>
  );
}

export default App;
