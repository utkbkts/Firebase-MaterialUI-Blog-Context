import React, { useContext } from "react";
import MyContext from "../context/Context";
import { Link } from "react-router-dom";
import "../utils/Category.scss"
const Category = () => {
  const context = useContext(MyContext);
  const { mode, categoryCount } = context;
  return (
    <div className="CategoryBlog">
      <h3>Category</h3>
      <div className="__a">
        <ul>
          {categoryCount?.map((x) => (
            <li>
              <Link to={`/category/${x.category}`}>
                {x.category} <span>({x.count})</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Category;
