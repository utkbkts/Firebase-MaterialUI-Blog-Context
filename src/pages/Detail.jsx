import React, { useContext, useEffect, useState } from "react";
import MyContext from "../context/Context";
import { useParams } from "react-router-dom";
import "../utils/Detail.scss";
import moment from "moment";
import Tags from "../components/Tags";
import Mostpopular from "../components/Mostpopular";
import RelatedBlogs from "../components/RelatedBlog";
import { isEmpty } from "lodash";
import Comment from "../components/Comment";
import CommentBox from "../components/CommentBox";
import UserComments from "../components/Comment";
import Likes from "../components/Likes";
const Detail = () => {
  const context = useContext(MyContext);
  const {
    mode,
    relatedBlogs,
    setUserComment,
    comments,
    handleComment,
    userId,
    userComment,
    blog,
    getBlogDetail,
    setLocalId
  } = context;
  const { id } = useParams();
  useEffect(() => {
    id && getBlogDetail(id);
    id && setLocalId(id);
  }, [id, setLocalId, getBlogDetail]);
  return (
    <>
      <div className="Details">
        <div className="__a">
          <img src={blog?.imageURL} alt="" />
          <div className="__b">
            <span className="title">{blog?.title}</span>
            <span>{moment(blog?.timestamps).format("LL")}</span>
          </div>
        </div>
      </div>
      <div className="__cauthor">
        <div className="__d">
          <div>
            <div className="__author">
              By {blog?.author} --- &nbsp;
              {moment(blog?.timestamps).startOf("day").fromNow()}
              <Likes/>
            </div>
            <div className="__g">
              <span className="description">{blog?.description}</span>
            </div>
          </div>
          <div>
            <RelatedBlogs id={id} RelatedBlog={relatedBlogs} />
          </div>
          <br />
          <div className="custom">
            <h4 className="small">{comments?.length} Comment</h4>
            {isEmpty(comments) ? (
              <UserComments message={"No comment yet posted on this blog"} />
            ) : (
              <>
                {comments?.map((x) => (
                  <Comment {...x} />
                ))}
              </>
            )}
          </div>
          <br />
          <CommentBox
            userId={userId}
            userComment={userComment}
            setUserComment={setUserComment}
            handleComment={handleComment}
          />
        </div>
        <div className="__f">
          <Tags />
          <Mostpopular />
        </div>
      </div>
    </>
  );
};

export default Detail;
