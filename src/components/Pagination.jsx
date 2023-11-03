import React, { useContext } from "react";
import MyContext from "../context/Context";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
const Pagination = ({handlePageChange}) => {
  const context = useContext(MyContext);
  const { mode, currentPage,NoofPages,fetchPrev,fetchMorePagination } = context;
  return (
    <div>
      <div>
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange("Prev")}
        >
          <ArrowBackIosNewIcon />
        </button>
        <span>{currentPage}</span>
        <button
          onClick={() => handlePageChange("Next")}
          disabled={currentPage === NoofPages}
        >
          <ArrowForwardIosIcon />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
