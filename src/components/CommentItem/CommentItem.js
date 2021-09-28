import { Avatar } from "@mui/material";
import React, { useState } from "react";
import "./CommentItem.css";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbDownAltOutlined from "@mui/icons-material/ThumbDownAltOutlined";
import Tooltip from "@mui/material/Tooltip";
import ut from "../../app/utils/utils";

function CommentItem({
  commentId,
  author,
  authorProfileImg,
  likeCount,
  text,
  publishTime,
}) {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  return (
    <div>
      <div className="comment-item">
        <div className="comment-left">
          <Avatar src={authorProfileImg} alt={author} />
        </div>
        <div className="comment-right">
          <div className="comment-title">
            <p className="comment-author">{author}</p>
            <p className="publish-time">
              {ut.getRelativeDateCreated(publishTime)}
            </p>
          </div>
          <p className="comment-text">{text}</p>
          <div className="thumbs-container">
            <p className="like-stat">
              {" "}
              <Tooltip title="Like" placement="top">
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
              <Tooltip title="Dislike" placement="top">
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
              </Tooltip>{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentItem;
