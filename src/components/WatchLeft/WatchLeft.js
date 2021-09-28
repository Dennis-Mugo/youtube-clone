import React, { useState } from "react";
import VideoDescription from "../VideoDescription/VideoDescription";
import Watch from "../Watch/Watch";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./WatchLeft.css";
import Comments from "../Comments/Comments";

function WatchLeft({ scrolled, scrollHandler }) {
  const { videoId } = useParams();

  const dispatch = useDispatch();

  const selectVideo = (state) =>
    state.videos.filter((video) => video.videoId === videoId)[0];
  let video = useSelector(selectVideo);
  if (!video) {
    let videos = JSON.parse(localStorage.getItem("videos"));
    videos.forEach((vid) => {
      dispatch({ type: "videos/loadVideos", payload: vid });
    });
  }
  video = useSelector(selectVideo);

  return (
    <div className="watch-left">
      <Watch videoId={videoId} />
      <hr />
      <VideoDescription videoId={videoId} />
      <hr />
      <Comments
        videoId={videoId}
        commentCount={video.commentCount}
        scrolled={scrolled}
        scrollHandler={scrollHandler}
      />
    </div>
  );
}

export default WatchLeft;
