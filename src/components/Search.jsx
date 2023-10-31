import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import MyContext from "../context/Context";
const Search = () => {
  const context = useContext(MyContext);
  const { mode, handleChange, search } = context;
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      navigate(`/search?searchQuery=${search}`);
    } else {
      navigate("/");
    }
  };
  return (
    <div>
      <Paper
        component="form"
        sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
        onSubmit={handleSubmit}
      >
          <InputBase
            value={search}
            onChange={handleChange}
            sx={{ ml: 1, flex: 1, width: "100%" }}
            placeholder="Search Blog"
            inputProps={{ "aria-label": "search google maps" }}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
      </Paper>
    </div>
  );
};

export default Search;
