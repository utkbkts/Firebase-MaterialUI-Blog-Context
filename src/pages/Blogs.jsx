import React, { useContext } from "react";
import MyContext from "../context/Context";
import Blog from "../components/Blog";
import "../utils/Pagination.scss"
import Pagination from "../components/Pagination";
const Blogs = (value) => {
  const context = useContext(MyContext);
  const { mode, paginationBlog,setcurrentPage,fetchMorePagination,fetchPrev } = context;
  const handlePageChange = (value) => {
    if (value === "Next") {
      setcurrentPage((page) => page + 1);
      fetchMorePagination();
    } else if (value === "Prev") {
      setcurrentPage((page) => page - 1);
      fetchPrev();
    }
  };
  return (
    <div className="Pagination">
      <div className="container">
        <div className="row">
          <div className="blog">
            {paginationBlog?.map((p)=>(
                <Blog {...p}/>
            ))}
          </div>
          <Pagination handlePageChange={handlePageChange}/>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
