import React from "react";
import BodyHeader from "../BodyHeader/BodyHeader";
import Videos from "../Videos/Videos";
import "./Body.css";

function Body(props) {
  return (
    <div className="body">
      <BodyHeader />
      <Videos />
    </div>
  );
}

export default Body;
