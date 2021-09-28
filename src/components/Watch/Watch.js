import React, { useState } from "react";
import "./Watch.css";
import YouTube from "react-youtube";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbDownAltOutlined from "@mui/icons-material/ThumbDownAltOutlined";
import Tooltip from "@mui/material/Tooltip";
import { useSelector, useDispatch } from "react-redux";
import ut from "../../app/utils/utils";
import { Skeleton } from "@mui/material";

function Watch({ videoId }) {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const selectVideo = (state) => {
    return state.videos.filter((video) => video.videoId === videoId)[0];
  };

  let video = useSelector(selectVideo);
  if (!video) {
    let videos = JSON.parse(localStorage.getItem("videos"));
    videos.forEach((video) => {
      dispatch({ type: "videos/loadVideos", payload: video });
    });
  }
  video = useSelector(selectVideo);
  let { title, viewCount, publishTime, likeCount, dislikeCount } = video;

  likeCount = parseInt(likeCount);
  dislikeCount = parseInt(dislikeCount);

  const opts = {
    width: "100%",
    // height: "56.25vw",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  return (
    <>
      {isLoading && (
        <div style={{ padding: "0" }}>
          <Skeleton width="100%" height="400px" />
        </div>
      )}
      <YouTube
        videoId={videoId}
        opts={opts}
        style={isLoading ? { display: "none" } : { display: "block" }}
        onReady={() => setIsLoading(false)}
      />

      <div className="video-stats">
        <h3 style={{ padding: "10px", fontWeight: "500" }}>{title}</h3>
        <div className="stats">
          <p className="stats-left">
            {ut.addComma(viewCount) + " views"}
            <FiberManualRecordIcon />
            {ut.formatDateCreated(publishTime)}
          </p>
          <p className="like-stat">
            {" "}
            <Tooltip title="I like this" placement="top">
              {liked ? (
                <ThumbUpAltIcon
                  onClick={() => {
                    setLiked(false);
                  }}
                />
              ) : (
                <ThumbUpAltOutlinedIcon
                  onClick={() => {
                    setLiked(true);
                    setDisliked(false);
                  }}
                />
              )}
            </Tooltip>
            {liked
              ? ut.relativeCount(likeCount + 1)
              : ut.relativeCount(likeCount)}
            <Tooltip title="I dislike this" placement="top">
              {disliked ? (
                <ThumbDownAltIcon
                  onClick={() => {
                    setDisliked(false);
                  }}
                />
              ) : (
                <ThumbDownAltOutlined
                  onClick={() => {
                    setDisliked(true);
                    setLiked(false);
                  }}
                />
              )}
            </Tooltip>
            {disliked
              ? ut.relativeCount(dislikeCount + 1)
              : ut.relativeCount(dislikeCount)}{" "}
          </p>
        </div>
        <br />
      </div>
    </>
  );
}

export default Watch;
