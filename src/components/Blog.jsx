import React, { useContext } from "react";
import "../utils/Home.scss";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import MyContext from "../context/Context";
import moment from "moment";
import { Link } from "react-router-dom";
const Blog = () => {
  const context = useContext(MyContext);
  const { mode, Getblog, handleDeleteBlog, User } = context;
  return (
    <div className="__c">
      <div className="__d" style={{color:mode==="dark"?"white":""}}>
        <span>Daily Blogs</span>
      </div>
      {Getblog?.map((x) => (
        <div className="__e" key={x.id} style={{color:mode==="dark"?"white":""}}>
          <img src={x.imageURL} alt="image" width={350} height={250} />
          <div className="__f">
            <Button variant="contained">{x.category}</Button>
            <span>
              <span className="subject">Subject:</span>
              {x.title}
            </span>
            <span>
              <span className="subject">creation date:</span>
              {moment(x?.timestamps).format("L")}
            </span>
            <span className="paragraf">
              <span className="subject">Description:</span>
              {x.description}
            </span>
            <div className="__button">
              <div>
                <Link to={`detail/${x.id}`}>
                  {" "}
                  <Button variant="outlined">Read More</Button>
                </Link>
              </div>
              {User?.uid && x.userId === User.uid && (
                <div className="__button1">
                  <RestoreFromTrashIcon
                    className="Icon"
                    onClick={() => handleDeleteBlog(x.id)}
                  />
                  <Link to={`/update/${x.id}`}>
                    <EditIcon className="Icon" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Blog;
