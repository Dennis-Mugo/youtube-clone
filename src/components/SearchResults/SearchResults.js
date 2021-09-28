import React, { useEffect, useState } from "react";
import "./SearchResults.css";
import { useParams } from "react-router-dom";
import youtube from "../../youtube";
import BodyHeader from "../BodyHeader/BodyHeader";
import SearchListOption from "../SearchListOption/SearchListOption";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

function SearchResults(props) {
  const { searchQuery } = useParams();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    youtube
      .getVideoSearchResults(searchQuery)
      .then((response) => {
        setVideos(response);
      })
      .catch((e) => {
        console.log(e);
      });

    return () => {
      setVideos([]);
    };
  }, [searchQuery]);

  // console.log(videos);

  return (
    <div className="search-results">
      <BodyHeader />
      <div className="search-result">
        {videos.length
          ? videos.map((video) => (
              <SearchListOption
                key={video.videoId}
                videoId={video.videoId}
                nextPageToken={video.nextPageToken}
              />
            ))
          : new Array(15).fill("").map((item, i) => (
              <SkeletonTheme color="lightgray" key={i}>
                <div style={{ padding: "10px 20px", width: "100%" }}>
                  <div
                    style={{
                      margin: "10px 5px",
                      display: "flex",
                    }}
                  >
                    <Skeleton width="400px" height="150px" />
                    <div
                      style={{
                        marginTop: "5px",
                        marginLeft: "5px",
                        flexGrow: "1",
                      }}
                    >
                      <Skeleton width="100%" height="40px" />
                      <Skeleton width="30%" height="20px" />
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <div>
                          <Skeleton circle={true} height={30} width={30} />
                        </div>
                        <div style={{ marginLeft: "5px" }}>
                          <Skeleton width="100px" height="20px" />
                        </div>
                      </div>
                      <Skeleton width="100%" height="20px" />
                      <Skeleton width="100%" height="20px" />
                    </div>
                  </div>
                </div>
              </SkeletonTheme>
            ))}
      </div>
    </div>
  );
}

export default SearchResults;
