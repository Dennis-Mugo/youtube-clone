import { Avatar, Button } from "@mui/material";
import { red } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./VideoDescription.css";
import youtube from "../../youtube";
import ut from "../../app/utils/utils";

function VideoDescription({ videoId }) {
  const [subscriberCount, setSubscriberCount] = useState("");
  const [channelThumb, setChannelThumb] = useState("");

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

  useEffect(() => {
    if (video) {
      youtube
        .getChannelInfo(video.channelId)
        .then((response) => {
          setSubscriberCount(response?.items[0]?.statistics?.subscriberCount);
          setChannelThumb(
            response?.items[0]?.snippet?.thumbnails?.default?.url
          );
        })
        .catch((e) => console.log(e));
    }
  }, [videoId]);

  return (
    <div className="video-desc">
      <Avatar src={channelThumb} alt={video.channelTitle} />
      <div className="desc-container">
        <div className="channel">
          <div className="desc">
            <h3>{video.channelTitle}</h3>
            <p>
              {subscriberCount &&
                `${ut.relativeCount(subscriberCount)} subscribers`}
            </p>
          </div>

          <Button variant="contained" style={{ backgroundColor: "#CC0000" }}>
            SUBSCRIBE
          </Button>
        </div>
        <div className="description">
          <p>{ut.truncate(video.description, 210)}</p>
        </div>
      </div>
    </div>
  );
}

export default VideoDescription;
