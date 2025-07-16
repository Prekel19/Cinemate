import { Swiper } from "swiper/react";
import "./style.scss";

export const HomeCarousel = () => {
  return (
    <div className="home-carousel">
      <Swiper slidesPerView={1}></Swiper>
    </div>
  );
};
