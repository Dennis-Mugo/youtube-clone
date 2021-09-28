import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./Videos.css";

import youtube from "../../youtube";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import Video from "../Video/Video";
import { useBottomScrollListener } from "react-bottom-scroll-listener";

function Videos(props) {
  const [videos, setVideos] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    youtube
      .getVideos()
      .then((response) => {
        // console.log(response);
        setVideos(response);
        response.forEach((res) => {
          dispatch({ type: "videos/loadVideos", payload: res });
        });
        localStorage.setItem("videos", JSON.stringify(response));
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const scrollHandler = () => {
    if (videos.length) {
      let nextPageToken = videos[videos.length - 1].nextPageToken;
      youtube
        .getVideos(nextPageToken)
        .then((res) => {
          if (res.length) {
            setVideos(videos.concat(res));
            res.forEach((item) => {
              dispatch({ type: "videos/loadVideos", payload: item });
            });
            localStorage.setItem("videos", JSON.stringify(videos.concat(res)));
          }
        })
        .catch((e) => console.log(e));
    }
  };

  const handleScroll = (e) => {
    let element = e.target;
    // console.log(container);

    if (element.scrollHeight - element.scrollTop <= element.clientHeight + 1) {
      scrollHandler();
    }
  };

  return (
    <div onScroll={handleScroll} className="videos">
      {videos.length
        ? videos.map((video, i) => (
            <Video
              key={i}
              videoId={video.videoId}
              title={video.title}
              publishTime={video.publishTime}
              videoThumbnail={video.videoThumbnail}
              duration={video.duration}
              viewCount={video.viewCount}
              channelTitle={video.channelTitle}
              channelId={video.channelId}
            />
          ))
        : new Array(15).fill("").map((item, i) => (
            <SkeletonTheme key={i} color="lightgray">
              <div style={{ padding: "0 5px" }}>
                <div
                  style={{ width: "250px", flexGrow: "1", margin: "10px 5px" }}
                >
                  <Skeleton width="100%" height="150px" />
                  <div style={{ display: "flex", marginTop: "5px" }}>
                    <Skeleton circle={true} height={50} width={50} />
                    <div style={{ marginLeft: "5px" }}>
                      <Skeleton width={150} />
                      <br />
                      <Skeleton width={90} />
                    </div>
                  </div>
                </div>
              </div>
            </SkeletonTheme>
          ))}
    </div>
  );
}

export default Videos;
