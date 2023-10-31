import React, { useContext, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import "../utils/Trending.scss";
import MyContext from "../context/Context";
import moment from "moment";
const Trending = () => {
  const context = useContext(MyContext);
  const { mode, Trending } = context;
  return (
    <div className="Swiper__slide">
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {Trending.map((x) => (
          <div key={x.id}>
            <SwiperSlide className="Trending">
              <img src={x.imageURL} alt="" />
              <div className="title">
                <span>{x.title}</span>
                <span> {moment(x.timestamp.toDate()).format("DD/MM/YYYY")}</span>
              </div>
            </SwiperSlide>
          </div>
        ))}
      </Swiper>
    </div>
  );
};

export default Trending;
