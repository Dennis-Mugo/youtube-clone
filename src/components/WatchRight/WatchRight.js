import React, { useEffect, useState } from "react";
import Video from "../Video/Video";
import "./WatchRight.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import youtube from "../../youtube";

function WatchRight(props) {
  const { videoId } = useParams();
  const selectVideos = (state) =>
    state.videos.filter((vid) => vid.videoId !== videoId);
  const [videos, setVideos] = useState(useSelector(selectVideos));

  useEffect(() => {
    youtube
      .getVideos()
      .then((res) => {
        setVideos(res.filter((vid) => vid.videoId !== videoId));
      })
      .catch((e) => console.log(e));
  }, [videoId]);

  return (
    <div className="watch-right">
      {videos.map(
        (
          {
            videoId,
            title,
            publishTime,
            videoThumbnail,
            duration,
            viewCount,
            channelTitle,
            channelId,
          },
          i
        ) => (
          <Video
            key={i}
            videoId={videoId}
            title={title}
            publishTime={publishTime}
            videoThumbnail={videoThumbnail}
            duration={duration}
            viewCount={viewCount}
            channelTitle={channelTitle}
            channelId={channelId}
            videoRight
          />
        )
      )}
    </div>
  );
}

export default WatchRight;
