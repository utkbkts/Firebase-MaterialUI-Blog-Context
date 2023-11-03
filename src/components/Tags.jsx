import React, { useContext } from "react";
import MyContext from "../context/Context";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Tags = () => {
  const context = useContext(MyContext);
  const { mode, Tags } = context;
  return (
    <div className="Tags">
      <div className="__tag">
        <span>Tags</span>
      </div>
      <div className="__t">
        {Tags?.map((tag, index) => (
          <div key={index}>
            <Link to={`/tag/${tag.text}`}>
              <Button variant="contained">{tag.text}</Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tags;
