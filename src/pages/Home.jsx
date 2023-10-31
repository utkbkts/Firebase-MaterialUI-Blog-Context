import React, { useContext } from "react";
import "../utils/Home.scss";
import MyContext from "../context/Context";
import Blog from "../components/Blog";
import Tags from "../components/Tags";
import Mostpopular from "../components/Mostpopular";
import Trending from "../components/Trending";
const Home = () => {
  const context = useContext(MyContext);
  const { mode, Getblog } = context;
  return (
    <div className="Home">
      <div className="__a">
       <Trending/>
      </div>
      <div className="__b">
        <Blog />
        <div className="__h">
          <Tags/>
         <Mostpopular/>
        </div>
      </div>
    </div>
  );
};

export default Home;
