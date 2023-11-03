import React, { useContext } from "react";
import "../utils/Home.scss";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import MyContext from "../context/Context";
import moment from "moment";
import { Link } from "react-router-dom";
const Blog = ({title,category,timestamps,description,userId,imageURL,id}) => {
  const context = useContext(MyContext);
  const { mode,handleDeleteBlog, User } = context;
  return (
    <div className="__c">
        <div className="__e" key={id} style={{color:mode==="dark"?"white":""}}>
          <img src={imageURL} alt="image" width={350} height={250} />
          <div className="__f">
            <Button variant="contained">{category}</Button>
            <span>
              <span className="subject">Subject:</span>
              {title}
            </span>
            <span>
              <span className="subject">creation date:</span>
              {moment(timestamps).format("L")}
            </span>
            <span className="paragraf">
              <span className="subject">Description:</span>
              {description}
            </span>
            <div className="__button" style={{gap:"1rem"}}>
              <div>
                <Link to={`/detail/${id}`}>
                  {" "}
                  <Button variant="outlined">Read More</Button>
                </Link>
              </div>
              {User && User.uid === userId && (
                <div className="__button1">
                  <RestoreFromTrashIcon
                    className="Icon"
                    onClick={() => handleDeleteBlog(id)}
                    style={{cursor:"pointer"}}
                  />
                  <Link to={`/update/${id}`}>
                    <EditIcon className="Icon" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
    </div>
  );
};

export default Blog;
