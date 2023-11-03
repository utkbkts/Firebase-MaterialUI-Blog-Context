import React, { useContext } from "react";
import { Link } from "react-router-dom";
import MyContext from "../context/Context";
import "../utils/Card.scss"
import { Button } from "@mui/material";
const Card = ({ title, description, imageURL, id, likes, comments }) => {
  const context = useContext(MyContext);
  const { mode } = context;
  return (
    <div className="Card">
      <div className="__a">
        <img src={imageURL} alt="" />
        <div>
          <span>{title}</span>
          <p>{description.slice(0, 15)}...</p>
        </div>
        <div className="">
          <Link to={`/detail/${id}`}>
            <Button variant="contained">Read More</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
