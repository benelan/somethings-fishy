import React from "react";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import { Navigation, Pagination } from "swiper";

import "swiper/swiper.min.css";
import "swiper/modules/navigation/navigation.min.css";
import "swiper/modules/pagination/pagination.min.css";

const MapSwiper: React.FC = ({ children }): JSX.Element => (
  <Swiper
    allowTouchMove={false}
    modules={[Navigation, Pagination]}
    navigation
    pagination={{ clickable: true }}
    spaceBetween={20}
    style={{ height: "100%", width: "100%" }}
  >
    <h3>Title</h3>
    {React.Children.map(children, (slide, index) => (
      <SwiperSlide key={index}>{slide}</SwiperSlide>
    ))}
  </Swiper>
);

export default MapSwiper;
