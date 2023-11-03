import React, { useContext } from "react";
import MyContext from "../context/Context";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import { Button } from "@mui/material";
const Likes = () => {
  const context = useContext(MyContext);
  const { handleLike, userId, likes } = context;
  const LikeStatus = () => {
    if (likes?.length > 0) {
      return likes.find((id) => id === userId) ? (
        <>
         <ThumbDownAltIcon />
          {likes.length}
          {likes.length === 1 ? "Like" : "Likes"}
        
        </>
      ) : (
        <>
           <ThumbUpIcon />
          {likes.length}
          {likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }
    return (
      <>
        <ThumbUpIcon />&nbsp;
        Like
      </>
    );
  };
  return (
    <>
      <span onClick={!userId ? null : handleLike}>
        {!userId ? (
          <Button  type="button" variant="contained">
            <LikeStatus />
          </Button>
        ) : (
          <Button type="button" variant="contained">
            <LikeStatus />
          </Button>
        )}
      </span>
    </>
  );
};

export default Likes;
