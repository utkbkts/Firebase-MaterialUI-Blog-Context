import React, { useContext, useEffect, useState } from "react";
import MyContext from "../context/Context";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import "../utils/Detail.scss";
import moment from "moment";

const Detail = () => {
  const context = useContext(MyContext);
  const { mode, loading, setloading } = context;
  const [BlogDetails, setBlogdetail] = useState(null);
  const { id } = useParams();
  const GetBlogDetails = async () => {
    setloading(true);
    const docRef = doc(db, "Blogs", id);
    const BlogDetail = await getDoc(docRef);
    setBlogdetail(BlogDetail.data());
    setloading(false);
  };
  useEffect(() => {
    id && GetBlogDetails();
  }, [id]);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="Details">
        <div className="__a">
          <img src={BlogDetails?.imageURL} alt="" />
          <div className="__b">
            <span className="title">{BlogDetails?.title}</span>
            <span>{moment(BlogDetails?.timestamps).format("LL")}</span>
          </div>
        </div>
      </div>
      <div className="__cauthor">
        <div className="__d">
          <div className="__author">
            By {BlogDetails?.author} --- &nbsp;
            {moment(BlogDetails?.timestamps).startOf("day").fromNow()}
          </div>
          <div className="__g">
            <span className="description">{BlogDetails?.description}</span>
          </div>
        </div>
        <div className="__f">
          <h2>Tags</h2>
          <h3>Most Popular</h3>
        </div>
      </div>
    </>
  );
};

export default Detail;
