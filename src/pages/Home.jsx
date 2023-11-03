import React, { useContext } from "react";
import "../utils/Home.scss";
import MyContext from "../context/Context";
import Blog from "../components/Blog";
import Tags from "../components/Tags";
import Mostpopular from "../components/Mostpopular";
import Trending from "../components/Trending";
import Search from "../components/Search";
import { Button } from "@mui/material";
import Category from "../components/Category";
const Home = () => {
  const context = useContext(MyContext);
  const { mode,fetchMore,EmptyIs,Getblog} = context;
  return (
    <div className="Home">
      <div className="__a">
       <Trending/>
      </div>
      <div className="__b">
      <div className="lazy">
      <div className="__d" style={{color:mode==="dark"?"white":""}}>
        <span>Daily Blogs</span>
      </div>
     {Getblog?.map((x)=>(
       <Blog key={x.id} {...x}/>
     ))}
       {!EmptyIs && (
         <Button variant="contained" onClick={fetchMore}>Load More</Button>
       )}
      </div>
        <div className="__h">
          <Tags/>
          <Search />
          <Category/>
         <Mostpopular/>
        </div>
      </div>
    </div>
  );
};

export default Home;
