import React, { useEffect, useState } from "react";
import "./Comments.css";
import ut from "../../app/utils/utils";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import { Avatar } from "@mui/material";
import youtube from "../../youtube";
import CommentItem from "../CommentItem/CommentItem";
import { useSelector } from "react-redux";

function Comments({ commentCount, videoId, scrolled, scrollHandler }) {
  const [comments, setComments] = useState([]);
  const userDetails = useSelector((state) => state?.user[0]);
  useEffect(() => {
    youtube
      .getVideoComments(videoId)
      .then((res) => {
        // console.log(res);
        setComments(res);
      })
      .catch((e) => console.log(e));
  }, [videoId]);

  const getMoreComments = () => {
    if (comments.length) {
      let pageToken = comments[comments.length - 1].nextPage;
      youtube
        .getVideoComments(videoId, pageToken)
        .then((res) => {
          console.log(res);
          setComments(comments.concat(res));
        })
        .catch((e) => console.log(e));
    }
  };

  if (scrolled) {
    getMoreComments();
    scrollHandler(false);

    console.log(5);
  }

  return (
    <div className="comments">
      {/* <button onClick={getMoreComments}>More comments</button> */}
      <div className="comments-count">
        <h3>{ut.addComma(commentCount)} Comments</h3>
        <FilterListOutlinedIcon />
      </div>
      <div className="current-user-commenting">
        <Avatar src={userDetails.avatar} alt={userDetails.userName} />
        <div className="user-text">
          <p>Commenting publicly as {userDetails.userName}</p>
          <hr />
        </div>
      </div>

      {comments.length &&
        comments.map(
          ({
            commentId,
            author,
            authorProfileImg,
            likeCount,
            text,
            publishTime,
          }) => (
            <CommentItem
              key={commentId}
              commentId={commentId}
              author={author}
              authorProfileImg={authorProfileImg}
              likeCount={likeCount}
              text={text}
              publishTime={publishTime}
            />
          )
        )}
    </div>
  );
}

export default Comments;
