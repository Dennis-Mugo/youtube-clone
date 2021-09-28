import React, { useEffect, useState } from "react";
import "./Video.css";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Avatar from "@mui/material/Avatar";
import youtube from "../../youtube";
import { useHistory } from "react-router-dom";
import utils from "../../app/utils/utils";

function Video({
  videoId,
  title,
  publishTime,
  videoThumbnail,
  duration,
  viewCount,
  channelTitle,
  channelId,
  videoRight,
}) {
  const [channelImg, setChannelImg] = useState("");
  const history = useHistory();
  useEffect(() => {
    youtube
      .getChannelInfo(channelId)
      .then((res) => {
        setChannelImg(res?.items[0]?.snippet?.thumbnails?.default?.url);
      })
      .catch((e) => console.log(e));

    return () => {
      setChannelImg("");
    };
  }, [channelId]);

  const selectVideo = () => {
    history.push(`/watch/${videoId}`);
  };

  return (
    <div
      className={videoRight ? "video video-right" : "video"}
      onClick={selectVideo}
    >
      <div className="video-thumbnail">
        <img src={videoThumbnail} alt="video-thumbnail" />
        <small>{utils.getDuration(duration)}</small>
      </div>
      <div className="video-details">
        {!videoRight && <Avatar src={channelImg} alt={channelTitle} />}

        <div className="content-details">
          <p className="video-title">{utils.truncate(title, 60)}</p>
          <p className="channel-title">{channelTitle}</p>
          <p className="bottom-detail">
            {utils.relativeCount(viewCount) + " views"}
            <FiberManualRecordIcon />
            {utils.getRelativeDateCreated(publishTime)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Video;
