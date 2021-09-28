import React, { useEffect, useState } from "react";
import "./SearchListOption.css";
import youtube from "../../youtube";
import ut from "../../app/utils/utils";
import { Avatar } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function SearchListOption({ videoId, nextPageToken }) {
  const [video, setVideo] = useState("");
  const [channelThumb, setChannelThumb] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    youtube
      .getVideo(videoId, nextPageToken)
      .then((response) => {
        // console.log(response);
        setVideo(response);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    if (video) {
      youtube
        .getChannelInfo(video.channelId)
        .then((response) => {
          setChannelThumb(
            response?.items[0]?.snippet?.thumbnails?.default?.url
          );
        })
        .catch((e) => console.log(e));
    }
  }, [video]);

  //   console.log(video?.description.split("\n"));
  const getShortDesc = (description) => {
    return video.description.split("\n")[0] + "...";
  };

  const handleClick = () => {
    if (video) {
      dispatch({ type: "videos/loadVideos", payload: video });
      let localStoreContents = JSON.parse(localStorage.getItem("videos"));
      localStoreContents.push(video);
      localStorage.setItem("videos", JSON.stringify(localStoreContents));
      history.push(`/watch/${video.videoId}`);
    }
  };

  return (
    <div className="search-list-option" onClick={handleClick}>
      {video && (
        <>
          <div className="list-left">
            <img src={video.videoThumbnail} alt={video.title} />
            <small>{ut.getDuration(video.duration)}</small>
          </div>
          <div className="list-right">
            <h3>{ut.truncate(video.title, 60)}</h3>
            <p className="video-stat">
              {ut.relativeCount(video.viewCount) + " views"}
              <FiberManualRecordIcon />
              {ut.getRelativeDateCreated(video.publishTime)}
            </p>
            <div className="channel-detail">
              <Avatar src={channelThumb} alt={video.channelTitle} />
              <p>{video.channelTitle}</p>
            </div>
            <p>{ut.truncate(video.description, 100)}</p>
          </div>
        </>
      )}
    </div>
  );
}

export default SearchListOption;
